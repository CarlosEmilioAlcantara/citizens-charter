from weasyprint import HTML, CSS

def create_pdf(html, request, stylesheets):
    pdf = HTML(
        string=html, 
        base_url=request.build_absolute_uri('/api/')
    ).write_pdf(
        stylesheets=[CSS(stylesheet) for stylesheet in stylesheets]
    )
    return pdf

def pdf_chunks(html, request, stylesheets):
    pdf = create_pdf(html, request, stylesheets)
    return create_chunks(pdf)