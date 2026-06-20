# Add project specific ProGuard rules here.
-keep class com.rkispro.marketplace.data.model.** { *; }
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}
-dontwarn io.github.jan.supabase.**
