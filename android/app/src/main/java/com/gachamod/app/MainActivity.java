package com.gachamod.app;

import android.annotation.SuppressLint;
import android.content.ContentValues;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

/**
 * Gacha Mod: envuelve el juego web (carpeta www dentro del APK) en un WebView.
 * El juego funciona 100% offline y guarda la partida en localStorage.
 */
public class MainActivity extends AppCompatActivity {

    /** Puente JS -> Android: permite guardar las fotos PNG en Descargas. */
    public class PngBridge {
        @JavascriptInterface
        public void savePng(String base64, String filename) {
            try {
                byte[] bytes = Base64.decode(base64, Base64.DEFAULT);
                String name = (filename == null || filename.trim().isEmpty()) ? "gacha_mod.png" : filename;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    ContentValues values = new ContentValues();
                    values.put(MediaStore.Downloads.DISPLAY_NAME, name);
                    values.put(MediaStore.Downloads.MIME_TYPE, "image/png");
                    values.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS);
                    Uri uri = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
                    if (uri == null) throw new IllegalStateException("Sin destino");
                    try (OutputStream out = getContentResolver().openOutputStream(uri)) { out.write(bytes); }
                } else {
                    File dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
                    if (!dir.exists()) dir.mkdirs();
                    try (FileOutputStream out = new FileOutputStream(new File(dir, name))) { out.write(bytes); }
                }
                runOnUiThread(() -> Toast.makeText(MainActivity.this, "📸 Guardado en Descargas", Toast.LENGTH_SHORT).show());
            } catch (Exception e) {
                runOnUiThread(() -> Toast.makeText(MainActivity.this, "No se pudo guardar la foto", Toast.LENGTH_SHORT).show());
            }
        }
    }

    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);      // localStorage: la partida
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        webView.addJavascriptInterface(new PngBridge(), "AndroidBridge");
        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());
        webView.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
