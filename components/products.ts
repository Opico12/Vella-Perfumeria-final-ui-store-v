
import type { Product } from './types';

export const allProducts: Product[] = [
    // --- FRAGANCIAS PREMIUM ---
    {
        id: 47718,
        name: "Eau de Toilette O Sweet Marshmallow",
        brand: "OnColour",
        price: 17.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47718%2F47718_1.png",
        description: "Un aroma dulce e irresistible inspirado en nubes de azúcar.",
        stock: 120,
        category: "perfume",
        tag: "NOVEDAD"
    },
    {
        id: 46060,
        name: "Perfume All or Nothing Amplified",
        brand: "All or Nothing",
        price: 62.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46060%2F46060_1.png",
        description: "Fragancia floral oriental con una intensidad sin precedentes.",
        stock: 45,
        category: "perfume",
        tag: "NOVEDAD"
    },
    {
        id: 47511,
        name: "Perfume Giordani Gold Essenza",
        brand: "Giordani Gold",
        price: 48.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42503%2F42503_1.png",
        description: "La joya de la perfumería Oriflame con notas de Flor de Azahar.",
        stock: 50,
        category: "perfume"
    },

    // --- SKINCARE: NOVAGE+ (PRO-COLLAGEN & ECLAT) ---
    {
        id: 42263,
        name: "Bruma facial Micro Essence Pro-Collagen NovAge+",
        brand: "NovAge+",
        price: 21.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42263%2F42263_1.png",
        description: "Bruma hidratante con micro-esencia que fortalece la barrera cutánea.",
        stock: 85,
        category: "skincare"
    },
    {
        id: 42444,
        name: "Sérum de hidratación intensa Pro-Collagen NovAge+",
        brand: "NovAge+",
        price: 43.89,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42444%2F42444_1.png",
        description: "Concentrado de hidratación profunda que rellena líneas de expresión.",
        stock: 30,
        category: "skincare"
    },
    {
        id: 42253,
        name: "Mascarilla revitalizante intensiva facial nocturna NovAge",
        brand: "NovAge",
        price: 29.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F42253%2F42253_1.png",
        description: "Ocho horas de sueño reparador en un tarro. Reduce signos de fatiga.",
        stock: 50,
        category: "skincare"
    },
    {
        id: 47104,
        name: "Peeling Pro-Collagen NovAge",
        brand: "NovAge",
        price: 26.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47104%2F47104_1.png",
        description: "Exfoliante químico suave para renovar la textura de la piel.",
        stock: 45,
        category: "skincare"
    },
    {
        id: 45248,
        name: "Sérum Eclat NovAge",
        brand: "NovAge",
        price: 34.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F45248%2F45248_1.png",
        description: "Sérum iluminador que combate las manchas y unifica el tono.",
        stock: 40,
        category: "skincare"
    },
    {
        id: 45243,
        name: "Crema hidratante ligera Eclat NovAge",
        brand: "NovAge",
        price: 28.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F45243%2F45243_1.png",
        description: "Textura ligera de rápida absorción para pieles con tendencia a manchas.",
        stock: 60,
        category: "skincare"
    },
    {
        id: 45245,
        name: "Crema hidratante rica Eclat NovAge",
        brand: "NovAge",
        price: 28.00,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F45245%2F45245_1.png",
        description: "Nutrición intensa para pieles secas que buscan luminosidad.",
        stock: 55,
        category: "skincare"
    },

    // --- SKINCARE: DIAMOND CELLULAR ---
    {
        id: 18437,
        name: "Tratamiento restaurador de noche Diamond Cellular",
        brand: "Diamond Cellular",
        price: 35.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F18437%2F18437_1.png",
        description: "Regeneración celular nocturna con polvo de diamante genuino.",
        stock: 20,
        category: "skincare"
    },
    {
        id: 13659,
        name: "Crema antienvejecimiento Diamond Cellular",
        brand: "Diamond Cellular",
        price: 43.89,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F13659%2FES%2F13659_1.png",
        description: "Tratamiento de lujo que combate todos los signos del envejecimiento.",
        stock: 15,
        category: "skincare"
    },
    {
        id: 21339,
        name: "Solución micelar Diamond Cellular",
        brand: "Diamond Cellular",
        price: 19.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F21339%2F21339_1.png",
        description: "Limpiadora, tónico y desmaquillante en un solo paso de lujo.",
        stock: 60,
        category: "skincare"
    },

    // --- SKINCARE: OPTIMALS ---
    {
        id: 46543,
        name: "Limpiador foaming gel Optimals",
        brand: "Optimals",
        price: 9.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46543%2F46543_1.png",
        description: "Gel espumoso que limpia profundamente y refresca.",
        stock: 180,
        category: "skincare"
    },
    {
        id: 46900,
        name: "Limpiador soft cream Optimals",
        brand: "Optimals",
        price: 9.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F46900%2F46900_1.png",
        description: "Limpiadora cremosa que reconforta la piel mientras elimina impurezas.",
        stock: 200,
        category: "skincare"
    },
    {
        id: 45292,
        name: "Multiproducto SPF 50 Daily Glow Optimals",
        brand: "Optimals",
        price: 16.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F45292%2F45292_1.png",
        description: "Protección urbana total contra rayos UV y contaminación.",
        stock: 150,
        category: "skincare"
    },
    {
        id: 45284,
        name: "Crema hidratante ligera Hydra Radiance Optimals",
        brand: "Optimals",
        price: 13.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F45284%2F45284_1.png",
        description: "Frescura e hidratación 24h para pieles mixtas.",
        stock: 110,
        category: "skincare"
    },
    {
        id: 45285,
        name: "Crema hidratante rica Hydra Radiance Optimals",
        brand: "Optimals",
        price: 13.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F45285%2F45285_1.png",
        description: "Nutrición intensa para pieles secas.",
        stock: 100,
        category: "skincare"
    },
    {
        id: 47437,
        name: "Parches faciales de gel Hydra Radiance Optimals",
        brand: "Optimals",
        price: 4.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47437%2F47437_1.png",
        description: "Efecto flash refrescante para despertar tu mirada.",
        stock: 300,
        category: "skincare"
    },
    {
        id: 45326,
        name: "Crema hidratante SPF 25 BeYoutiful Optimals",
        brand: "Optimals",
        price: 18.47,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F45326%2F45326_1.png",
        description: "Hidratación diaria con factor de protección.",
        stock: 75,
        category: "skincare"
    },
    {
        id: 45291,
        name: "Contorno de ojos y labios Optimals",
        brand: "Optimals",
        price: 12.31,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F45291%2F45291_1.png",
        description: "Tratamiento antiedad específico para zonas delicadas.",
        stock: 130,
        category: "skincare"
    },

    // --- ACCESORIOS Y DISPOSITIVOS ---
    {
        id: 47422,
        name: "Revitalizador de ojos Oriflame Exclusive",
        brand: "Exclusive",
        price: 12.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47422%2F47422_1.png",
        description: "Aplicador metálico ergonómico para reducir bolsas y ojeras mediante masaje frío.",
        stock: 100,
        category: "accessories"
    },
    {
        id: 48918,
        name: "Masajeador facial Arctic Ritual",
        brand: "Exclusive",
        price: 19.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48918%2F48918_1.png",
        description: "Crioterapia facial avanzada para reafirmar y desinflamar la piel.",
        stock: 40,
        category: "accessories",
        tag: "NOVEDAD"
    },
    {
        id: 47524,
        name: "Banda para el pelo skincare",
        brand: "Exclusive",
        price: 6.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47524%2F47524_1.png",
        description: "Banda ajustable ultra suave para tu rutina de belleza.",
        stock: 500,
        category: "accessories"
    },
    {
        id: 47517,
        name: "Limpiador facial de silicona",
        brand: "Exclusive",
        price: 5.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47517%2F47517_1.png",
        description: "Herramienta de silicona para una limpieza profunda de poros.",
        stock: 400,
        category: "accessories"
    },
    {
        id: 47419,
        name: "Brocha de crema hidratante y sérum Oriflame Exclusive",
        brand: "Exclusive",
        price: 8.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47419%2F47419_1.png",
        description: "Aplicador profesional para productos de tratamiento facial.",
        stock: 250,
        category: "accessories"
    },
    {
        id: 48954,
        name: "Reloj Glitters of Love",
        brand: "Exclusive",
        price: 29.99,
        imageUrl: "https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F48954%2F48954_1.png",
        description: "Reloj de edición limitada con detalles brillantes.",
        stock: 20,
        category: "accessories",
        tag: "NOVEDAD"
    }
];
