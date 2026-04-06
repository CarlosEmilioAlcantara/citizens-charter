from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import CitizensCharter

@receiver(post_delete, sender=CitizensCharter)
def delete_citizens_charter(sender, instance, **kwargs):
    if instance.pdf:
        instance.pdf.delete(save=False)