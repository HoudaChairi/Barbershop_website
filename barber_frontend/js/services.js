export const services = [
    {
        id: 1,
        name: "Classic Haircut",
        price: 30,
        duration: 30,
        description: "Traditional haircut with styling"
    },
    {
        id: 2,
        name: "Beard Trim",
        price: 20,
        duration: 20,
        description: "Professional beard grooming"
    },
    {
        id: 3,
        name: "Hair & Beard Combo",
        price: 45,
        duration: 45,
        description: "Complete hair and beard styling"
    },
    {
        id: 4,
        name: "Premium Styling",
        price: 40,
        duration: 40,
        description: "Advanced styling with premium products"
    }
];

export function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <p class="price">$${service.price}</p>
        <p>${service.duration} minutes</p>
    `;
    return card;
}