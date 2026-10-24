from .models import CarMake, CarModel


def initiate():
    """Seed starter makes/models once; safe to call from the API repeatedly."""
    sample_data = {
        "Toyota": ("Reliable Japanese engineering", [
            ("Camry", "SEDAN", 2024, "Silver"),
            ("Corolla", "SEDAN", 2023, "White"),
            ("RAV4", "SUV", 2025, "Blue"),
        ]),
        "Nissan": ("Practical vehicles for everyday driving", [
            ("Altima", "SEDAN", 2024, "Black"),
            ("Rogue", "SUV", 2025, "Gray"),
        ]),
        "Mercedes-Benz": ("Premium German automobiles", [
            ("C-Class", "SEDAN", 2024, "Black"),
            ("GLC", "SUV", 2025, "White"),
        ]),
        "Audi": ("Performance and contemporary design", [
            ("A4", "SEDAN", 2024, "Gray"),
            ("Q5", "SUV", 2025, "Blue"),
        ]),
        "Kia": ("Modern, value-focused vehicles", [
            ("Sportage", "SUV", 2024, "Red"),
            ("K5", "SEDAN", 2023, "White"),
        ]),
    }
    for make_name, (description, models) in sample_data.items():
        make, _ = CarMake.objects.get_or_create(name=make_name, defaults={"description": description})
        for model_name, model_type, year, color in models:
            CarModel.objects.get_or_create(
                car_make=make, name=model_name, year=year,
                defaults={"type": model_type, "color": color},
            )
