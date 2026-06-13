import type { GeneratedMealPlan, MealPlanRequest } from "@/lib/types/meal-plan";

const dayNames = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export function createMockMealPlan(request: MealPlanRequest): GeneratedMealPlan {
  const days = Array.from({ length: request.durationDays }, (_, index) => {
    const dayIndex = index + 1;
    const isEven = dayIndex % 2 === 0;
    const meals = [
      {
        type: "sarapan",
        name: isEven ? "Oatmeal pisang dan telur rebus" : "Nasi telur dadar dan tumis bayam",
        description: "Menu sederhana untuk anak kos dengan bahan mudah ditemukan.",
        estimatedCalories: isEven ? 430 : 520,
        estimatedProtein: isEven ? 19 : 22,
        estimatedCost: isEven ? 11000 : 12000,
        prepTimeMinutes: isEven ? 10 : 15,
        ingredients: [
          { name: isEven ? "Oatmeal" : "Nasi putih", quantity: isEven ? "50g" : "1 porsi", estimatedPrice: isEven ? 5000 : 4000 },
          { name: "Telur ayam", quantity: isEven ? "1 butir" : "2 butir", estimatedPrice: isEven ? 3000 : 6000 },
          { name: isEven ? "Pisang" : "Bayam", quantity: isEven ? "1 buah" : "1 ikat kecil", estimatedPrice: isEven ? 3000 : 2000 },
        ],
        steps: isEven
          ? ["Seduh oatmeal dengan air panas.", "Rebus telur sampai matang.", "Sajikan dengan irisan pisang."]
          : ["Masak telur dadar.", "Tumis bayam sebentar.", "Sajikan dengan nasi hangat."],
      },
      {
        type: "makan siang",
        name: isEven ? "Nasi tempe orek dan sayur bening" : "Nasi ayam suwir dan kangkung",
        description: "Makan siang hemat dengan protein cukup dan sayur.",
        estimatedCalories: isEven ? 610 : 680,
        estimatedProtein: isEven ? 24 : 35,
        estimatedCost: isEven ? 14500 : 19000,
        prepTimeMinutes: isEven ? 20 : 25,
        ingredients: [
          { name: "Nasi putih", quantity: "1 porsi", estimatedPrice: 4000 },
          { name: isEven ? "Tempe" : "Ayam suwir", quantity: isEven ? "100g" : "80g", estimatedPrice: isEven ? 4500 : 12000 },
          { name: isEven ? "Bayam" : "Kangkung", quantity: "1 porsi", estimatedPrice: 3000 },
          { name: "Bumbu dasar", quantity: "secukupnya", estimatedPrice: isEven ? 3000 : 0 },
        ],
        steps: ["Siapkan nasi.", "Masak protein dengan bumbu sederhana.", "Tambahkan sayur dan sajikan."],
      },
      {
        type: "makan malam",
        name: isEven ? "Mie telur sayur" : "Tahu tempe kecap dan nasi",
        description: "Menu malam cepat dan tetap hemat.",
        estimatedCalories: isEven ? 560 : 590,
        estimatedProtein: isEven ? 21 : 26,
        estimatedCost: isEven ? 12000 : 14000,
        prepTimeMinutes: 15,
        ingredients: [
          { name: isEven ? "Mie" : "Nasi putih", quantity: "1 porsi", estimatedPrice: isEven ? 3500 : 4000 },
          { name: isEven ? "Telur ayam" : "Tahu dan tempe", quantity: isEven ? "1 butir" : "150g", estimatedPrice: isEven ? 3000 : 7000 },
          { name: "Sayur hijau", quantity: "1 porsi", estimatedPrice: 3000 },
        ],
        steps: ["Masak bahan utama.", "Tambahkan protein dan sayur.", "Bumbui sederhana lalu sajikan."],
      },
    ].slice(0, request.mealsPerDay);

    return {
      dayIndex,
      dayName: dayNames[index % dayNames.length],
      label: `Hari ${dayIndex}`,
      totalCalories: meals.reduce((total, meal) => total + meal.estimatedCalories, 0),
      totalProtein: meals.reduce((total, meal) => total + meal.estimatedProtein, 0),
      totalCost: meals.reduce((total, meal) => total + meal.estimatedCost, 0),
      badges: request.nutritionGoal === "high-protein" ? ["Hemat", "Tinggi Protein"] : ["Hemat", "Praktis"],
      meals,
    };
  });

  const estimatedTotalCost = days.reduce((total, day) => total + day.totalCost, 0);

  return {
    title: "Meal Plan Mingguan Anak Kos",
    summary: {
      weeklyBudget: request.weeklyBudget,
      estimatedTotalCost,
      estimatedSavings: Math.max(request.weeklyBudget - estimatedTotalCost, 0),
      averageCaloriesPerDay: Math.round(days.reduce((total, day) => total + day.totalCalories, 0) / days.length),
      averageProteinPerDay: Math.round(days.reduce((total, day) => total + day.totalProtein, 0) / days.length),
      goal: request.nutritionGoal,
      notes: "Menu mock dibuat hemat, realistis, dan mudah dimasak dengan alat kos.",
    },
    days,
    shoppingList: [
      {
        category: "Karbohidrat",
        items: [
          { name: "Beras putih", quantity: "2 kg", estimatedPrice: 32000, isOptional: false },
          { name: "Mie", quantity: "3 bungkus", estimatedPrice: 10500, isOptional: true },
        ],
      },
      {
        category: "Protein",
        items: [
          { name: "Telur ayam", quantity: "10 butir", estimatedPrice: 22000, isOptional: false },
          { name: "Tempe", quantity: "4 papan kecil", estimatedPrice: 18000, isOptional: false },
          { name: "Tahu", quantity: "10 pcs", estimatedPrice: 12000, isOptional: false },
        ],
      },
      {
        category: "Sayur",
        items: [
          { name: "Bayam", quantity: "3 ikat", estimatedPrice: 12000, isOptional: false },
          { name: "Kangkung", quantity: "2 ikat", estimatedPrice: 8000, isOptional: false },
        ],
      },
    ],
    nutritionAnalysis: {
      carbsPercent: 48,
      proteinPercent: request.nutritionGoal === "high-protein" ? 32 : 27,
      fatPercent: request.nutritionGoal === "high-protein" ? 20 : 25,
      tips: [
        "Tambahkan buah murah seperti pisang jika butuh energi tambahan.",
        "Porsi nasi bisa dikurangi jika target kamu hemat kalori.",
      ],
    },
    budgetTips: [
      "Belanja sayur di pasar pagi agar lebih murah.",
      "Gunakan telur, tahu, dan tempe sebagai protein utama yang hemat.",
    ],
    warnings: [
      "Estimasi harga dapat berbeda tergantung lokasi dan musim.",
      "Data nutrisi adalah perkiraan kasar dan bukan saran medis.",
    ],
  };
}
