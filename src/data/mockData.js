export const USERS = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@laikavet.com',
        password: 'admin123',
        role: 'admin', // 'admin', 'veterinarian', 'receptionist'
        avatar: 'https://i.pravatar.cc/150?u=admin'
    },
    {
        id: '2',
        name: 'Dr. Sarah Smith',
        email: 'sarah@laikavet.com',
        password: 'vet123',
        role: 'veterinarian',
        avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
        id: '3',
        name: 'Client User',
        email: 'cliente@email.com',
        password: 'cliente123',
        role: 'client',
        avatar: 'https://i.pravatar.cc/150?u=client'
    }
];

export const PATIENTS = [
    {
        id: '1',
        name: 'Max',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 5,
        weight: 32,
        color: 'Golden',
        owner: {
            name: 'John Doe',
            phone: '555-0123',
            email: 'john@example.com',
            address: '123 Main St'
        },
        history: [
            {
                id: 'h1',
                date: '2023-10-15',
                reason: 'Annual Vaccination',
                diagnosis: 'Healthy',
                treatment: 'Rabies vaccine administered',
                vetId: '2'
            }
        ]
    },
    {
        id: '2',
        name: 'Luna',
        species: 'Cat',
        breed: 'Siamese',
        age: 2,
        weight: 4,
        color: 'Cream/Brown',
        owner: {
            name: 'Jane Smith',
            phone: '555-0456',
            email: 'jane@example.com',
            address: '456 Oak Ave'
        },
        history: []
    },
    {
        id: '3',
        name: 'Rocky',
        species: 'Dog',
        breed: 'Bulldog',
        age: 3,
        weight: 25,
        color: 'White/Brown',
        owner: {
            name: 'Mike Johnson',
            phone: '555-0789',
            email: 'mike@example.com',
            address: '789 Pine Ln'
        },
        history: []
    },
    {
        id: '4',
        name: 'Bella',
        species: 'Cat',
        breed: 'Persian',
        age: 4,
        weight: 5,
        color: 'White',
        owner: {
            name: 'Emily Davis',
            phone: '555-1011',
            email: 'emily@example.com',
            address: '101 Maple Dr'
        },
        history: []
    },
    {
        id: '5',
        name: 'Charlie',
        species: 'Dog',
        breed: 'Beagle',
        age: 1,
        weight: 10,
        color: 'Tricolor',
        owner: {
            name: 'Chris Wilson',
            phone: '555-1213',
            email: 'chris@example.com',
            address: '202 Birch Rd'
        },
        history: []
    }
];

export const PRODUCTS = [
    {
        id: '1',
        name: 'Premium Dog Food',
        category: 'food',
        price: 45.99,
        stock: 50,
        brand: 'Royal Canin',
        image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=300&q=80',
        description: 'High quality food for adult dogs.'
    },
    {
        id: '2',
        name: 'Cat Toy Set',
        category: 'accessories',
        price: 12.50,
        stock: 15,
        brand: 'PetFun',
        image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=300&q=80',
        description: 'Interactive toys for cats.'
    },
    {
        id: '3',
        name: 'Flea Collar',
        category: 'medicines',
        price: 25.00,
        stock: 5, // Low stock
        brand: 'Bayer',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=300&q=80',
        description: 'Long lasting flea protection.'
    },
    {
        id: '4',
        name: 'Dog Leash',
        category: 'accessories',
        price: 18.00,
        stock: 30,
        brand: 'Flexi',
        image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=300&q=80',
        description: 'Retractable dog leash.'
    },
    {
        id: '5',
        name: 'Cat Food',
        category: 'food',
        price: 30.00,
        stock: 40,
        brand: 'Whiskas',
        image: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?auto=format&fit=crop&w=300&q=80',
        description: 'Delicious food for cats.'
    }
];

export const APPOINTMENTS = [
    {
        id: '1',
        patientId: '1',
        vetId: '2',
        date: '2025-12-02', // Tomorrow
        time: '10:00',
        type: 'checkup',
        status: 'confirmed'
    },
    {
        id: '2',
        patientId: '2',
        vetId: '2',
        date: '2025-12-02',
        time: '11:30',
        type: 'vaccination',
        status: 'pending'
    }
];

export const ORDERS = [
    {
        id: 'ord-001',
        date: '2025-11-20',
        status: 'delivered',
        total: 58.49,
        items: [
            { id: '1', name: 'Premium Dog Food', quantity: 1, price: 45.99 },
            { id: '2', name: 'Cat Toy Set', quantity: 1, price: 12.50 }
        ]
    },
    {
        id: 'ord-002',
        date: '2025-11-28',
        status: 'shipped',
        total: 25.00,
        items: [
            { id: '3', name: 'Flea Collar', quantity: 1, price: 25.00 }
        ]
    },
    {
        id: 'ord-003',
        date: '2025-12-01',
        status: 'pending',
        total: 18.00,
        items: [
            { id: '4', name: 'Dog Leash', quantity: 1, price: 18.00 }
        ]
    }
];

export const SALES = [
    {
        id: 'sale-001',
        date: '2025-11-25',
        time: '09:30',
        channel: 'presencial',
        total: 60.00,
        client: 'Juan Pérez',
        items: [
            { id: '1', name: 'Consulta General', quantity: 1, price: 30.00, category: 'service' },
            { id: '5', name: 'Cat Food', quantity: 1, price: 30.00, category: 'product' }
        ]
    },
    {
        id: 'sale-002',
        date: '2025-11-26',
        time: '14:15',
        channel: 'presencial',
        total: 45.00,
        client: 'Maria Garcia',
        items: [
            { id: '2', name: 'Vacunación', quantity: 1, price: 45.00, category: 'service' }
        ]
    },
    {
        id: 'sale-003',
        date: '2025-11-27',
        time: '11:00',
        channel: 'presencial',
        total: 12.50,
        client: 'Anonimo',
        items: [
            { id: '2', name: 'Cat Toy Set', quantity: 1, price: 12.50, category: 'product' }
        ]
    },
    {
        id: 'sale-004',
        date: '2025-11-29',
        time: '16:45',
        channel: 'presencial',
        total: 85.99,
        client: 'Carlos Lopez',
        items: [
            { id: '1', name: 'Premium Dog Food', quantity: 1, price: 45.99, category: 'product' },
            { id: '3', name: 'Limpieza Dental', quantity: 1, price: 40.00, category: 'service' }
        ]
    },
    {
        id: 'sale-005',
        date: '2025-12-01',
        time: '10:00',
        channel: 'presencial',
        total: 25.00,
        client: 'Ana Martinez',
        items: [
            { id: '3', name: 'Flea Collar', quantity: 1, price: 25.00, category: 'product' }
        ]
    }
];
