from weasyprint import HTML, CSS

# TODO; See if we can replace this with just sending the whole blob
# instead of chunking
def create_chunks(pdf, download=False):
    chunk_size = 8192
    if download:
        with pdf.open('rb') as pdf:
            while chunk := pdf.read(chunk_size):
                yield chunk
    else:
        for i in range(0, len(pdf), chunk_size):
            yield pdf[i:i+chunk_size]

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