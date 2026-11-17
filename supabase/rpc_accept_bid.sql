-- Phase 21: Transactional Atomicity
-- This RPC safely accepts a bid by executing 3 table updates inside a single database transaction.
-- It also standardizes the platform commission to exactly 3%.

CREATE OR REPLACE FUNCTION accept_bid(
    p_quote_id UUID,
    p_request_id UUID,
    p_customer_id UUID,
    p_vendor_id UUID,
    p_amount NUMERIC
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_commission_pct NUMERIC := 3.0;
    v_commission_amt NUMERIC;
    v_project_id UUID;
    v_result JSONB;
BEGIN
    -- 1. Calculate the exact 3% commission
    v_commission_amt := (p_amount * v_commission_pct) / 100.0;

    -- 2. Update quote status to accepted
    UPDATE vendor_quotes 
    SET status = 'accepted', updated_at = NOW()
    WHERE id = p_quote_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Quote not found or update failed';
    END IF;

    -- 3. Update request status to awarded
    UPDATE marketplace_requests 
    SET status = 'awarded', updated_at = NOW()
    WHERE id = p_request_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Marketplace request not found or update failed';
    END IF;

    -- 4. Create active Project
    INSERT INTO projects (
        request_id,
        customer_id,
        vendor_id,
        quote_id,
        project_value,
        commission_percentage,
        commission_amount,
        status,
        created_at,
        updated_at
    ) VALUES (
        p_request_id,
        p_customer_id,
        p_vendor_id,
        p_quote_id,
        p_amount,
        v_commission_pct,
        v_commission_amt,
        'awarded',
        NOW(),
        NOW()
    ) RETURNING id INTO v_project_id;

    -- 5. Return the new project JSON
    SELECT row_to_json(p) INTO v_result
    FROM projects p
    WHERE p.id = v_project_id;

    RETURN v_result;
END;
$$;
