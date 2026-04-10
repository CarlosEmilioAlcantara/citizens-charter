from django.apps import apps
from django.contrib.contenttypes.models import ContentType

def get_content_type_id(model_name):
    content_type_id = ContentType.objects.get_for_model(
        apps.get_model('api', model_name)
    ).id
    return content_type_id