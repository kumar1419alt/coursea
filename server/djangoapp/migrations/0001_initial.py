# Initial migration for the car make/model catalogue.
from django.db import migrations, models
import django.core.validators
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name="CarMake",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=100, unique=True)),
                ("description", models.TextField(blank=True)),
            ],
            options={"ordering": ["name"]},
        ),
        migrations.CreateModel(
            name="CarModel",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "name",
                    models.CharField(max_length=100),
                ),
                (
                    "type",
                    models.CharField(
                        choices=[
                            ("SEDAN", "Sedan"),
                            ("SUV", "SUV"),
                            ("WAGON", "Wagon"),
                            ("COUPE", "Coupe"),
                            ("CONVERTIBLE", "Convertible"),
                            ("PICKUP", "Pickup"),
                            ("JEEP", "Jeep"),
                            ("HATCHBACK", "Hatchback"),
                        ],
                        default="SUV",
                        max_length=11,
                    ),
                ),
                (
                    "year",
                    models.IntegerField(
                        default=2025,
                        validators=[
                            django.core.validators.MinValueValidator(2015),
                            django.core.validators.MaxValueValidator(2035),
                        ],
                    ),
                ),
                ("color", models.CharField(blank=True, max_length=50)),
                (
                    "car_make",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="models",
                        to="djangoapp.carmake",
                    ),
                ),
            ],
            options={"ordering": ["car_make__name", "name"]},
        ),
        migrations.AddConstraint(
            model_name="carmodel",
            constraint=models.UniqueConstraint(
                fields=("car_make", "name", "year"),
                name="unique_make_model_year",
            ),
        ),
    ]
