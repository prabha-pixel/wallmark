$port = 8080
$folder = "c:\Users\hp\Desktop\wallmark"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server started at http://localhost:$port/"

try {
    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            
            $rawPath = $request.Url.LocalPath.TrimStart('/')
            if ([string]::IsNullOrEmpty($rawPath)) { $rawPath = "index.html" }
            $decodedPath = [System.Uri]::UnescapeDataString($rawPath)
            $filePath = Join-Path $folder $decodedPath
            
            if (Test-Path $filePath -PathType Container) {
                $filePath = Join-Path $filePath "index.html"
            }
            
            if (Test-Path $filePath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $mime = switch ($ext) {
                    ".html" { "text/html; charset=utf-8" }
                    ".htm" { "text/html; charset=utf-8" }
                    ".css" { "text/css; charset=utf-8" }
                    ".js" { "application/javascript; charset=utf-8" }
                    ".json" { "application/json; charset=utf-8" }
                    ".jpeg" { "image/jpeg" }
                    ".jpg" { "image/jpeg" }
                    ".png" { "image/png" }
                    ".webp" { "image/webp" }
                    ".svg" { "image/svg+xml" }
                    ".ico" { "image/x-icon" }
                    ".woff" { "font/woff" }
                    ".woff2" { "font/woff2" }
                    default { "application/octet-stream" }
                }
                $response.ContentType = $mime
                $response.ContentLength64 = $bytes.Length
                $response.StatusCode = 200
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }
            } else {
                $response.StatusCode = 404
                $buf = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.ContentType = "text/plain; charset=utf-8"
                $response.ContentLength64 = $buf.Length
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($buf, 0, $buf.Length)
                }
            }
            $response.Close()
        } catch {
            Write-Host "Request handled with error: $_"
            try { $context.Response.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
}
