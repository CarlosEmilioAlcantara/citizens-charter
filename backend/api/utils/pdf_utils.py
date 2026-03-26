from weasyprint import HTML, CSS

def pdf_chunks(html, request, stylesheets):
    pdf = HTML(
        string=html, 
        base_url=request.build_absolute_uri('/api/')
    ).write_pdf(
        stylesheets=[CSS(stylesheet) for stylesheet in stylesheets]
    )

    chunk_size = 8192
    for i in range(0, len(pdf), chunk_size):
        yield pdf[i:i+chunk_size]