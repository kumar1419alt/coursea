from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class CarMake(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]


class CarModel(models.Model):
    CAR_TYPES = [
        ("SEDAN", "Sedan"), ("SUV", "SUV"), ("WAGON", "Wagon"),
        ("COUPE", "Coupe"), ("CONVERTIBLE", "Convertible"),
        ("PICKUP", "Pickup"), ("JEEP", "Jeep"), ("HATCHBACK", "Hatchback"),
    ]
    car_make = models.ForeignKey(CarMake, related_name="models", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=11, choices=CAR_TYPES, default="SUV")
    year = models.IntegerField(default=2025, validators=[MinValueValidator(2015), MaxValueValidator(2035)])
    color = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"{self.car_make.name} {self.name} ({self.year})"

    class Meta:
        ordering = ["car_make__name", "name"]
        constraints = [
            models.UniqueConstraint(fields=["car_make", "name", "year"], name="unique_make_model_year")
        ]
