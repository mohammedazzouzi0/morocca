"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "ar" | "fr" | "darija"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
  t: (key: string) => string
}

const translations = {
  en: {
    // Site Info
    siteName: "Babouche Maroc",

    // Navigation
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",

    // Product Related
    ourProducts: "Our Products",
    productsDescription: "Discover our authentic collection of handcrafted Moroccan babouche slippers",
    featuredProducts: "Featured Products",
    featuredProductsDescription: "Handpicked selection of our finest babouche slippers",
    viewAllProducts: "View All Products",
    addToCart: "Add to Cart",
    productNotFound: "Product not found",
    backToProducts: "Back to Products",
    selectColor: "Select Color",
    selectSize: "Select Size",
    quantity: "Quantity",
    selected: "Selected",
    reviews: "reviews",
    items: "items",
    inquireWhatsApp: "Inquire via WhatsApp",
    productFeatures: "Product Features",

    // Categories
    allCategories: "All Categories",
    traditional: "Traditional",
    modern: "Modern",
    luxury: "Luxury",
    categories: "Categories",

    // Colors
    allColors: "All Colors",
    brown: "Brown",
    black: "Black",
    gold: "Gold",
    white: "White",
    red: "Red",
    blue: "Blue",
    colors: "Colors",

    // Sizes
    size: "Size",
    sizes: "Sizes",

    // Pricing
    allPrices: "All Prices",
    price: "Price",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",

    // Search & Filter
    searchProducts: "Search products...",
    productsFound: "products found",
    noProductsFound: "No products found",
    popularity: "Popularity",
    name: "Name",

    // Cart
    shoppingCart: "Shopping Cart",
    emptyCart: "Your cart is empty",
    emptyCartDescription: "Add some beautiful babouche to get started",
    continueShopping: "Continue Shopping",
    itemsInCart: "items in cart",
    clearCart: "Clear Cart",

    // Checkout
    checkout: "Checkout",
    backToCart: "Back to Cart",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax",
    total: "Total",
    free: "Free",
    includingTax: "including tax",
    proceedToCheckout: "Proceed to Checkout",

    // Customer Info
    customerInformation: "Customer Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",

    // Shipping
    shippingInformation: "Shipping Information",
    address: "Address",
    city: "City",
    postalCode: "Postal Code",

    // Payment
    paymentMethod: "Payment Method",
    cashOnDelivery: "Cash on Delivery",
    cashOnDeliveryDescription: "Pay when you receive your order",

    // Order
    orderNotes: "Order Notes",
    orderNotesPlaceholder: "Any special instructions for your order...",
    placeOrder: "Place Order",
    processingOrder: "Processing Order...",
    orderConfirmed: "Order Confirmed!",
    orderConfirmationMessage: "Thank you for your order. We'll contact you via WhatsApp to confirm details.",

    // Features
    handcrafted: "Handcrafted",
    authentic: "Authentic",
    comfortable: "Comfortable",
    premiumMaterials: "Premium Materials",
    comfortableFit: "Comfortable Fit",
    authenticDesign: "Authentic Design",

    // About
    aboutTitle: "Authentic Moroccan Craftsmanship",
    aboutDescription:
      "For generations, our artisans have perfected the art of creating traditional Moroccan babouche slippers using time-honored techniques and premium materials.",
    traditionalCraftsmanship: "Traditional Craftsmanship",
    craftsmanshipDescription: "Each pair is handmade by skilled artisans",
    materialsDescription: "Only the finest leather and materials",
    yearsExperience: "Years Experience",
    happyCustomers: "Happy Customers",
    handmade: "Handmade",

    // Testimonials
    customerReviews: "Customer Reviews",
    reviewsDescription: "What our customers say about our babouche slippers",

    // Newsletter
    newsletterTitle: "Stay Updated",
    newsletterDescription: "Subscribe to get updates on new collections and exclusive offers",
    emailPlaceholder: "Enter your email",
    subscribe: "Subscribe",
    subscriptionSuccess: "Thank you for subscribing!",
    newsletterPrivacy: "We respect your privacy and won't spam you",

    // Footer
    footerDescription: "Authentic Moroccan babouche slippers crafted with traditional techniques and modern comfort.",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    allRightsReserved: "All rights reserved",

    // WhatsApp
    whatsappGreeting: "Hello! I'm interested in your babouche slippers.",
    contactWhatsApp: "Contact via WhatsApp",
    whatsappProductInquiry: "I'm interested in this product:",
    whatsappContact: "WhatsApp Contact",
    whatsappContactMessage: "We'll contact you via WhatsApp within 24 hours to confirm your order details.",

    // Order Process
    whatHappensNext: "What happens next?",
    step1: "We'll contact you via WhatsApp to confirm your order details",
    step2: "We'll prepare your babouche slippers with care",
    step3: "Free delivery to your doorstep with cash on delivery",

    // Stock & Inventory
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    lowStock: "Low Stock",
    stock: "Stock",
    featured: "Featured",

    // Admin
    adminDashboard: "Admin Dashboard",
    adminDashboardDescription: "Manage your Moroccan babouche store",
    totalProducts: "Total Products",
    totalOrders: "Total Orders",
    totalRevenue: "Total Revenue",
    pendingOrders: "Pending Orders",
    recentProducts: "Recent Products",
    recentOrders: "Recent Orders",
    quickActions: "Quick Actions",
    addNewProduct: "Add New Product",
    manageOrders: "Manage Orders",
    viewWebsite: "View Website",

    // Product Management
    productManagement: "Product Management",
    addProduct: "Add Product",
    backToAdmin: "Back to Admin",
    confirmDeleteProduct: "Are you sure you want to delete this product?",

    // Order Management
    orderManagement: "Order Management",
    orders: "orders",
    searchOrders: "Search orders...",
    allStatuses: "All Statuses",
    pending: "Pending",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    customerInfo: "Customer Info",
    orderItems: "Order Items",
    orderTotal: "Order Total",
    shippingAddress: "Shipping Address",
    noOrdersFound: "No orders found",

    // Product Form
    basicInformation: "Basic Information",
    productName: "Product Name",
    description: "Description",
    pricingAndCategory: "Pricing & Category",
    category: "Category",
    featuredProduct: "Featured Product",
    colorsAndSizes: "Colors & Sizes",
    availableColors: "Available Colors",
    availableSizes: "Available Sizes",
    colorName: "Color name",
    sizeNumber: "Size number",
    addColor: "Add Color",
    addSize: "Add Size",
    cancel: "Cancel",
    saveProduct: "Save Product",
    saving: "Saving...",

    // Order Confirmation
    newOrder: "New Order",
    orderItems: "Order Items",
    notes: "Notes",
    none: "None",
    backToHome: "Back to Home",

    // Trust & Security
    secureCheckout: "Secure Checkout",
    freeShipping: "Free Shipping",
    easyReturns: "Easy Returns",

    // Hero Section
    heroTitle: "Authentic Moroccan Babouche",
    heroSubtitle:
      "Discover the perfect blend of traditional craftsmanship and modern comfort with our handcrafted babouche slippers.",
    shopNow: "Shop Now",
    learnMore: "Learn More",

    // Actions
    viewAll: "View All",

    // Contact and WhatsApp related translations
    contactUs: "Contact Us",
    contactDescription: "Get in touch with us for any questions about our babouche slippers",
    sendMessage: "Send Message",
    subject: "Subject",
    message: "Message",
    sendViaWhatsApp: "Send via WhatsApp",
    contactForm: "Contact Form",
    callUs: "Call us during business hours",
    emailUs: "Send us an email anytime",
    visitUs: "Visit our workshop",
    businessHours: "Business Hours",
    mondayToFriday: "Monday to Friday",
    saturday: "Saturday",
    closedSunday: "Closed on Sunday",
    quickContact: "Quick Contact",
    productQuestions: "Product Questions",
    orderSupport: "Order Support",
    shippingInfo: "Shipping Info",
    generalHelp: "General Help",
    preferWhatsApp: "Prefer WhatsApp?",
    fasterResponse: "Get faster responses via WhatsApp",
    help: "Help",
    responseTime: "Response time",
    within24Hours: "Within 24 hours",
  },

  ar: {
    // Site Info
    siteName: "بابوش المغرب",

    // Navigation
    home: "الرئيسية",
    products: "المنتجات",
    about: "حولنا",
    contact: "اتصل بنا",

    // Product Related
    ourProducts: "منتجاتنا",
    productsDescription: "اكتشف مجموعتنا الأصيلة من البلاغي المغربية المصنوعة يدوياً",
    featuredProducts: "المنتجات المميزة",
    featuredProductsDescription: "مجموعة مختارة من أجود البلاغي لدينا",
    viewAllProducts: "عرض جميع المنتجات",
    addToCart: "أضف للسلة",
    productNotFound: "المنتج غير موجود",
    backToProducts: "العودة للمنتجات",
    selectColor: "اختر اللون",
    selectSize: "اختر المقاس",
    quantity: "الكمية",
    selected: "المختار",
    reviews: "تقييمات",
    items: "قطع",
    inquireWhatsApp: "استفسر عبر واتساب",
    productFeatures: "مميزات المنتج",

    // Categories
    allCategories: "جميع الفئات",
    traditional: "تقليدي",
    modern: "عصري",
    luxury: "فاخر",
    categories: "الفئات",

    // Colors
    allColors: "جميع الألوان",
    brown: "بني",
    black: "أسود",
    gold: "ذهبي",
    white: "أبيض",
    red: "أحمر",
    blue: "أزرق",
    colors: "الألوان",

    // Sizes
    size: "المقاس",
    sizes: "المقاسات",

    // Pricing
    allPrices: "جميع الأسعار",
    price: "السعر",
    priceLowToHigh: "السعر: من الأقل للأعلى",
    priceHighToLow: "السعر: من الأعلى للأقل",

    // Search & Filter
    searchProducts: "البحث في المنتجات...",
    productsFound: "منتج موجود",
    noProductsFound: "لا توجد منتجات",
    popularity: "الشعبية",
    name: "الاسم",

    // Cart
    shoppingCart: "سلة التسوق",
    emptyCart: "سلتك فارغة",
    emptyCartDescription: "أضف بعض البلاغي الجميلة للبدء",
    continueShopping: "متابعة التسوق",
    itemsInCart: "قطعة في السلة",
    clearCart: "إفراغ السلة",

    // Checkout
    checkout: "الدفع",
    backToCart: "العودة للسلة",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    tax: "الضريبة",
    total: "المجموع",
    free: "مجاني",
    includingTax: "شامل الضريبة",
    proceedToCheckout: "متابعة الدفع",

    // Customer Info
    customerInformation: "معلومات العميل",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "الهاتف",

    // Shipping
    shippingInformation: "معلومات الشحن",
    address: "العنوان",
    city: "المدينة",
    postalCode: "الرمز البريدي",

    // Payment
    paymentMethod: "طريقة الدفع",
    cashOnDelivery: "الدفع عند الاستلام",
    cashOnDeliveryDescription: "ادفع عند استلام طلبك",

    // Order
    orderNotes: "ملاحظات الطلب",
    orderNotesPlaceholder: "أي تعليمات خاصة لطلبك...",
    placeOrder: "تأكيد الطلب",
    processingOrder: "جاري معالجة الطلب...",
    orderConfirmed: "تم تأكيد الطلب!",
    orderConfirmationMessage: "شكراً لك على طلبك. سنتواصل معك عبر واتساب لتأكيد التفاصيل.",

    // Features
    handcrafted: "صناعة يدوية",
    authentic: "أصيل",
    comfortable: "مريح",
    premiumMaterials: "مواد فاخرة",
    comfortableFit: "مقاس مريح",
    authenticDesign: "تصميم أصيل",

    // About
    aboutTitle: "الحرفية المغربية الأصيلة",
    aboutDescription: "لأجيال، أتقن حرفيونا فن صناعة البلاغي المغربية التقليدية باستخدام تقنيات عريقة ومواد فاخرة.",
    traditionalCraftsmanship: "الحرفية التقليدية",
    craftsmanshipDescription: "كل زوج مصنوع يدوياً بواسطة حرفيين مهرة",
    materialsDescription: "أجود أنواع الجلد والمواد فقط",
    yearsExperience: "سنة خبرة",
    happyCustomers: "عميل سعيد",
    handmade: "صناعة يدوية",

    // Testimonials
    customerReviews: "آراء العملاء",
    reviewsDescription: "ما يقوله عملاؤنا عن بلاغينا",

    // Newsletter
    newsletterTitle: "ابق على اطلاع",
    newsletterDescription: "اشترك للحصول على تحديثات المجموعات الجديدة والعروض الحصرية",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    subscribe: "اشترك",
    subscriptionSuccess: "شكراً لك على الاشتراك!",
    newsletterPrivacy: "نحترم خصوصيتك ولن نرسل لك رسائل مزعجة",

    // Footer
    footerDescription: "بلاغي مغربية أصيلة مصنوعة بتقنيات تقليدية وراحة عصرية.",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    allRightsReserved: "جميع الحقوق محفوظة",

    // WhatsApp
    whatsappGreeting: "مرحباً! أنا مهتم ببلاغيكم.",
    contactWhatsApp: "تواصل عبر واتساب",
    whatsappProductInquiry: "أنا مهتم بهذا المنتج:",
    whatsappContact: "تواصل واتساب",
    whatsappContactMessage: "سنتواصل معك عبر واتساب خلال 24 ساعة لتأكيد تفاصيل طلبك.",

    // Order Process
    whatHappensNext: "ما الذي سيحدث بعد ذلك؟",
    step1: "سنتواصل معك عبر واتساب لتأكيد تفاصيل طلبك",
    step2: "سنحضر بلاغيك بعناية",
    step3: "توصيل مجاني لباب منزلك مع الدفع عند الاستلام",

    // Stock & Inventory
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    lowStock: "مخزون قليل",
    stock: "المخزون",
    featured: "مميز",

    // Admin
    adminDashboard: "لوحة الإدارة",
    adminDashboardDescription: "إدارة متجر البلاغي المغربية",
    totalProducts: "إجمالي المنتجات",
    totalOrders: "إجمالي الطلبات",
    totalRevenue: "إجمالي الإيرادات",
    pendingOrders: "الطلبات المعلقة",
    recentProducts: "المنتجات الحديثة",
    recentOrders: "الطلبات الحديثة",
    quickActions: "إجراءات سريعة",
    addNewProduct: "إضافة منتج جديد",
    manageOrders: "إدارة الطلبات",
    viewWebsite: "عرض الموقع",

    // Product Management
    productManagement: "إدارة المنتجات",
    addProduct: "إضافة منتج",
    backToAdmin: "العودة للإدارة",
    confirmDeleteProduct: "هل أنت متأكد من حذف هذا المنتج؟",

    // Order Management
    orderManagement: "إدارة الطلبات",
    orders: "طلبات",
    searchOrders: "البحث في الطلبات...",
    allStatuses: "جميع الحالات",
    pending: "معلق",
    shipped: "مشحون",
    delivered: "مسلم",
    cancelled: "ملغي",
    customerInfo: "معلومات العميل",
    orderItems: "عناصر الطلب",
    orderTotal: "إجمالي الطلب",
    shippingAddress: "عنوان الشحن",
    noOrdersFound: "لا توجد طلبات",

    // Product Form
    basicInformation: "المعلومات الأساسية",
    productName: "اسم المنتج",
    description: "الوصف",
    pricingAndCategory: "السعر والفئة",
    category: "الفئة",
    featuredProduct: "منتج مميز",
    colorsAndSizes: "الألوان والمقاسات",
    availableColors: "الألوان المتاحة",
    availableSizes: "المقاسات المتاحة",
    colorName: "اسم اللون",
    sizeNumber: "رقم المقاس",
    addColor: "إضافة لون",
    addSize: "إضافة مقاس",
    cancel: "إلغاء",
    saveProduct: "حفظ المنتج",
    saving: "جاري الحفظ...",

    // Order Confirmation
    newOrder: "طلب جديد",
    orderItems: "عناصر الطلب",
    notes: "ملاحظات",
    none: "لا يوجد",
    backToHome: "العودة للرئيسية",

    // Trust & Security
    secureCheckout: "دفع آمن",
    freeShipping: "شحن مجاني",
    easyReturns: "إرجاع سهل",

    // Hero Section
    heroTitle: "بابوش مغربي أصيل",
    heroSubtitle: "اكتشف المزيج المثالي بين الحرفية التقليدية والراحة العصرية مع بلاغينا المصنوعة يدوياً.",
    shopNow: "تسوق الآن",
    learnMore: "اعرف المزيد",

    // Actions
    viewAll: "عرض الكل",

    // Contact and WhatsApp related translations
    contactUs: "اتصل بنا",
    contactDescription: "تواصل معنا لأي أسئلة حول البلاغي المغربية",
    sendMessage: "إرسال رسالة",
    subject: "الموضوع",
    message: "الرسالة",
    sendViaWhatsApp: "إرسال عبر واتساب",
    contactForm: "نموذج الاتصال",
    callUs: "اتصل بنا خلال ساعات العمل",
    emailUs: "أرسل لنا بريد إلكتروني في أي وقت",
    visitUs: "زر ورشتنا",
    businessHours: "ساعات العمل",
    mondayToFriday: "الاثنين إلى الجمعة",
    saturday: "السبت",
    closedSunday: "مغلق يوم الأحد",
    quickContact: "تواصل سريع",
    productQuestions: "أسئلة المنتجات",
    orderSupport: "دعم الطلبات",
    shippingInfo: "معلومات الشحن",
    generalHelp: "مساعدة عامة",
    preferWhatsApp: "تفضل واتساب؟",
    fasterResponse: "احصل على ردود أسرع عبر واتساب",
    help: "مساعدة",
    responseTime: "وقت الاستجابة",
    within24Hours: "خلال 24 ساعة",
  },

  fr: {
    // Site Info
    siteName: "Babouche Maroc",

    // Navigation
    home: "Accueil",
    products: "Produits",
    about: "À propos",
    contact: "Contact",

    // Product Related
    ourProducts: "Nos Produits",
    productsDescription: "Découvrez notre collection authentique de babouches marocaines artisanales",
    featuredProducts: "Produits Vedettes",
    featuredProductsDescription: "Sélection de nos plus belles babouches",
    viewAllProducts: "Voir Tous les Produits",
    addToCart: "Ajouter au Panier",
    productNotFound: "Produit non trouvé",
    backToProducts: "Retour aux Produits",
    selectColor: "Choisir la Couleur",
    selectSize: "Choisir la Taille",
    quantity: "Quantité",
    selected: "Sélectionné",
    reviews: "avis",
    items: "articles",
    inquireWhatsApp: "Demander via WhatsApp",
    productFeatures: "Caractéristiques du Produit",

    // Categories
    allCategories: "Toutes les Catégories",
    traditional: "Traditionnel",
    modern: "Moderne",
    luxury: "Luxe",
    categories: "Catégories",

    // Colors
    allColors: "Toutes les Couleurs",
    brown: "Marron",
    black: "Noir",
    gold: "Or",
    white: "Blanc",
    red: "Rouge",
    blue: "Bleu",
    colors: "Couleurs",

    // Sizes
    size: "Taille",
    sizes: "Tailles",

    // Pricing
    allPrices: "Tous les Prix",
    price: "Prix",
    priceLowToHigh: "Prix: Croissant",
    priceHighToLow: "Prix: Décroissant",

    // Search & Filter
    searchProducts: "Rechercher des produits...",
    productsFound: "produits trouvés",
    noProductsFound: "Aucun produit trouvé",
    popularity: "Popularité",
    name: "Nom",

    // Cart
    shoppingCart: "Panier",
    emptyCart: "Votre panier est vide",
    emptyCartDescription: "Ajoutez de belles babouches pour commencer",
    continueShopping: "Continuer les Achats",
    itemsInCart: "articles dans le panier",
    clearCart: "Vider le Panier",

    // Checkout
    checkout: "Commande",
    backToCart: "Retour au Panier",
    orderSummary: "Résumé de Commande",
    subtotal: "Sous-total",
    shipping: "Livraison",
    tax: "Taxe",
    total: "Total",
    free: "Gratuit",
    includingTax: "taxes incluses",
    proceedToCheckout: "Passer Commande",

    // Customer Info
    customerInformation: "Informations Client",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",

    // Shipping
    shippingInformation: "Informations de Livraison",
    address: "Adresse",
    city: "Ville",
    postalCode: "Code Postal",

    // Payment
    paymentMethod: "Mode de Paiement",
    cashOnDelivery: "Paiement à la Livraison",
    cashOnDeliveryDescription: "Payez à la réception de votre commande",

    // Order
    orderNotes: "Notes de Commande",
    orderNotesPlaceholder: "Instructions spéciales pour votre commande...",
    placeOrder: "Passer Commande",
    processingOrder: "Traitement de la Commande...",
    orderConfirmed: "Commande Confirmée!",
    orderConfirmationMessage:
      "Merci pour votre commande. Nous vous contacterons via WhatsApp pour confirmer les détails.",

    // Features
    handcrafted: "Artisanal",
    authentic: "Authentique",
    comfortable: "Confortable",
    premiumMaterials: "Matériaux Premium",
    comfortableFit: "Ajustement Confortable",
    authenticDesign: "Design Authentique",

    // About
    aboutTitle: "Artisanat Marocain Authentique",
    aboutDescription:
      "Depuis des générations, nos artisans perfectionnent l'art de créer des babouches marocaines traditionnelles avec des techniques ancestrales et des matériaux premium.",
    traditionalCraftsmanship: "Artisanat Traditionnel",
    craftsmanshipDescription: "Chaque paire est faite à la main par des artisans qualifiés",
    materialsDescription: "Seulement les meilleurs cuirs et matériaux",
    yearsExperience: "Années d'Expérience",
    happyCustomers: "Clients Satisfaits",
    handmade: "Fait Main",

    // Testimonials
    customerReviews: "Avis Clients",
    reviewsDescription: "Ce que nos clients disent de nos babouches",

    // Newsletter
    newsletterTitle: "Restez Informé",
    newsletterDescription:
      "Abonnez-vous pour recevoir les mises à jour sur les nouvelles collections et offres exclusives",
    emailPlaceholder: "Entrez votre email",
    subscribe: "S'abonner",
    subscriptionSuccess: "Merci pour votre abonnement!",
    newsletterPrivacy: "Nous respectons votre vie privée et ne vous spammerons pas",

    // Footer
    footerDescription:
      "Babouches marocaines authentiques fabriquées avec des techniques traditionnelles et un confort moderne.",
    quickLinks: "Liens Rapides",
    contactInfo: "Informations de Contact",
    allRightsReserved: "Tous droits réservés",

    // WhatsApp
    whatsappGreeting: "Bonjour! Je suis intéressé par vos babouches.",
    contactWhatsApp: "Contacter via WhatsApp",
    whatsappProductInquiry: "Je suis intéressé par ce produit:",
    whatsappContact: "Contact WhatsApp",
    whatsappContactMessage:
      "Nous vous contacterons via WhatsApp dans les 24 heures pour confirmer les détails de votre commande.",

    // Order Process
    whatHappensNext: "Que se passe-t-il ensuite?",
    step1: "Nous vous contacterons via WhatsApp pour confirmer les détails de votre commande",
    step2: "Nous préparerons vos babouches avec soin",
    step3: "Livraison gratuite à votre porte avec paiement à la livraison",

    // Stock & Inventory
    inStock: "En Stock",
    outOfStock: "Rupture de Stock",
    lowStock: "Stock Faible",
    stock: "Stock",
    featured: "Vedette",

    // Admin
    adminDashboard: "Tableau de Bord Admin",
    adminDashboardDescription: "Gérez votre boutique de babouches marocaines",
    totalProducts: "Total Produits",
    totalOrders: "Total Commandes",
    totalRevenue: "Chiffre d'Affaires Total",
    pendingOrders: "Commandes en Attente",
    recentProducts: "Produits Récents",
    recentOrders: "Commandes Récentes",
    quickActions: "Actions Rapides",
    addNewProduct: "Ajouter Nouveau Produit",
    manageOrders: "Gérer les Commandes",
    viewWebsite: "Voir le Site",

    // Product Management
    productManagement: "Gestion des Produits",
    addProduct: "Ajouter Produit",
    backToAdmin: "Retour à l'Admin",
    confirmDeleteProduct: "Êtes-vous sûr de vouloir supprimer ce produit?",

    // Order Management
    orderManagement: "Gestion des Commandes",
    orders: "commandes",
    searchOrders: "Rechercher des commandes...",
    allStatuses: "Tous les Statuts",
    pending: "En Attente",
    shipped: "Expédié",
    delivered: "Livré",
    cancelled: "Annulé",
    customerInfo: "Info Client",
    orderItems: "Articles de Commande",
    orderTotal: "Total Commande",
    shippingAddress: "Adresse de Livraison",
    noOrdersFound: "Aucune commande trouvée",

    // Product Form
    basicInformation: "Informations de Base",
    productName: "Nom du Produit",
    description: "Description",
    pricingAndCategory: "Prix et Catégorie",
    category: "Catégorie",
    featuredProduct: "Produit Vedette",
    colorsAndSizes: "Couleurs et Tailles",
    availableColors: "Couleurs Disponibles",
    availableSizes: "Tailles Disponibles",
    colorName: "Nom de couleur",
    sizeNumber: "Numéro de taille",
    addColor: "Ajouter Couleur",
    addSize: "Ajouter Taille",
    cancel: "Annuler",
    saveProduct: "Sauvegarder Produit",
    saving: "Sauvegarde...",

    // Order Confirmation
    newOrder: "Nouvelle Commande",
    orderItems: "Articles de Commande",
    notes: "Notes",
    none: "Aucune",
    backToHome: "Retour à l'Accueil",

    // Trust & Security
    secureCheckout: "Commande Sécurisée",
    freeShipping: "Livraison Gratuite",
    easyReturns: "Retours Faciles",

    // Hero Section
    heroTitle: "Babouche Marocaine Authentique",
    heroSubtitle:
      "Découvrez le mélange parfait entre l'artisanat traditionnel et le confort moderne avec nos babouches faites à la main.",
    shopNow: "Acheter Maintenant",
    learnMore: "En Savoir Plus",

    // Actions
    viewAll: "Voir Tout",

    // Contact and WhatsApp related translations
    contactUs: "Contactez-nous",
    contactDescription: "Contactez-nous pour toute question sur nos babouches",
    sendMessage: "Envoyer un Message",
    subject: "Sujet",
    message: "Message",
    sendViaWhatsApp: "Envoyer via WhatsApp",
    contactForm: "Formulaire de Contact",
    callUs: "Appelez-nous pendant les heures d'ouverture",
    emailUs: "Envoyez-nous un email à tout moment",
    visitUs: "Visitez notre atelier",
    businessHours: "Heures d'Ouverture",
    mondayToFriday: "Lundi au Vendredi",
    saturday: "Samedi",
    closedSunday: "Fermé le Dimanche",
    quickContact: "Contact Rapide",
    productQuestions: "Questions Produits",
    orderSupport: "Support Commandes",
    shippingInfo: "Info Livraison",
    generalHelp: "Aide Générale",
    preferWhatsApp: "Préférez WhatsApp?",
    fasterResponse: "Obtenez des réponses plus rapides via WhatsApp",
    help: "Aide",
    responseTime: "Temps de réponse",
    within24Hours: "Dans les 24 heures",
  },

  darija: {
    // Site Info
    siteName: "بابوش المغرب",

    // Navigation
    home: "الداخلة",
    products: "المنتجات",
    about: "علينا",
    contact: "تواصل معانا",

    // Product Related
    ourProducts: "المنتجات ديالنا",
    productsDescription: "شوف المجموعة ديالنا ديال البلاغي المغربية الأصيلة",
    featuredProducts: "المنتجات المميزة",
    featuredProductsDescription: "أحسن البلاغي عندنا",
    viewAllProducts: "شوف جميع المنتجات",
    addToCart: "زيد للسلة",
    productNotFound: "المنتج ماكاينش",
    backToProducts: "رجع للمنتجات",
    selectColor: "اختار اللون",
    selectSize: "اختار القياس",
    quantity: "الكمية",
    selected: "المختار",
    reviews: "آراء",
    items: "حاجات",
    inquireWhatsApp: "سول في واتساب",
    productFeatures: "خصائص المنتج",

    // Categories
    allCategories: "جميع الأنواع",
    traditional: "تقليدي",
    modern: "عصري",
    luxury: "فاخر",
    categories: "الأنواع",

    // Colors
    allColors: "جميع الألوان",
    brown: "قهوي",
    black: "كحل",
    gold: "دهبي",
    white: "بيض",
    red: "حمر",
    blue: "زرق",
    colors: "الألوان",

    // Sizes
    size: "القياس",
    sizes: "القياسات",

    // Pricing
    allPrices: "جميع الأثمان",
    price: "الثمن",
    priceLowToHigh: "الثمن: من الرخيص للغالي",
    priceHighToLow: "الثمن: من الغالي للرخيص",

    // Search & Filter
    searchProducts: "قلب على المنتجات...",
    productsFound: "منتج لقيناه",
    noProductsFound: "ماكاين حتى منتج",
    popularity: "الشعبية",
    name: "السمية",

    // Cart
    shoppingCart: "سلة التسوق",
    emptyCart: "السلة خاوية",
    emptyCartDescription: "زيد شي بلاغي زوينة باش تبدا",
    continueShopping: "كمل التسوق",
    itemsInCart: "حاجة في السلة",
    clearCart: "فرغ السلة",

    // Checkout
    checkout: "الخلاص",
    backToCart: "رجع للسلة",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع",
    shipping: "التوصيل",
    tax: "الضريبة",
    total: "المجموع الكامل",
    free: "بلاش",
    includingTax: "مع الضريبة",
    proceedToCheckout: "كمل الخلاص",

    // Customer Info
    customerInformation: "معلومات الزبون",
    firstName: "السمية الأولى",
    lastName: "اسم العائلة",
    email: "الإيميل",
    phone: "التيليفون",

    // Shipping
    shippingInformation: "معلومات التوصيل",
    address: "العنوان",
    city: "المدينة",
    postalCode: "الكود البريدي",

    // Payment
    paymentMethod: "طريقة الخلاص",
    cashOnDelivery: "الخلاص عند التوصيل",
    cashOnDeliveryDescription: "اخلص فاش توصلك الطلبية",

    // Order
    orderNotes: "ملاحظات الطلبية",
    orderNotesPlaceholder: "شي تعليمات خاصة للطلبية ديالك...",
    placeOrder: "أكد الطلبية",
    processingOrder: "كنعالجو الطلبية...",
    orderConfirmed: "تأكدت الطلبية!",
    orderConfirmationMessage: "شكرا ليك على الطلبية. غانتواصلو معاك في واتساب باش نأكدو التفاصيل.",

    // Features
    handcrafted: "مصنوع بيد",
    authentic: "أصيل",
    comfortable: "مريح",
    premiumMaterials: "مواد زوينة",
    comfortableFit: "قياس مريح",
    authenticDesign: "تصميم أصيل",

    // About
    aboutTitle: "الصناعة المغربية الأصيلة",
    aboutDescription: "من أجيال، الصناع ديالنا كيتقنو فن صناعة البلاغي المغربية التقليدية بتقنيات قديمة ومواد زوينة.",
    traditionalCraftsmanship: "الصناعة التقليدية",
    craftsmanshipDescription: "كل زوج مصنوع بيد صناع مهرة",
    materialsDescription: "غير أحسن أنواع الجلد والمواد",
    yearsExperience: "عام تجربة",
    happyCustomers: "زبون راضي",
    handmade: "مصنوع بيد",

    // Testimonials
    customerReviews: "آراء الزبناء",
    reviewsDescription: "أشنو كيقولو الزبناء ديالنا على البلاغي",

    // Newsletter
    newsletterTitle: "بقا متابع",
    newsletterDescription: "اشترك باش توصلك أخبار المجموعات الجديدة والعروض الخاصة",
    emailPlaceholder: "دخل الإيميل ديالك",
    subscribe: "اشترك",
    subscriptionSuccess: "شكرا ليك على الاشتراك!",
    newsletterPrivacy: "كنحترمو الخصوصية ديالك وماغانرسلوش ليك رسائل مزعجة",

    // Footer
    footerDescription: "بلاغي مغربية أصيلة مصنوعة بتقنيات تقليدية وراحة عصرية.",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات التواصل",
    allRightsReserved: "جميع الحقوق محفوظة",

    // WhatsApp
    whatsappGreeting: "السلام! أنا مهتم بالبلاغي ديالكم.",
    contactWhatsApp: "تواصل في واتساب",
    whatsappProductInquiry: "أنا مهتم بهاد المنتج:",
    whatsappContact: "تواصل واتساب",
    whatsappContactMessage: "غانتواصلو معاك في واتساب خلال 24 ساعة باش نأكدو تفاصيل الطلبية ديالك.",

    // Order Process
    whatHappensNext: "أشنو غايوقع من بعد؟",
    step1: "غانتواصلو معاك في واتساب باش نأكدو تفاصيل الطلبية ديالك",
    step2: "غانحضرو البلاغي ديالك بعناية",
    step3: "توصيل بلاش لباب الدار مع الخلاص عند الاستلام",

    // Stock & Inventory
    inStock: "كاين",
    outOfStock: "ماكاينش",
    lowStock: "مخزون قليل",
    stock: "المخزون",
    featured: "مميز",

    // Admin
    adminDashboard: "لوحة الإدارة",
    adminDashboardDescription: "دير الحانوت ديال البلاغي المغربية",
    totalProducts: "مجموع المنتجات",
    totalOrders: "مجموع الطلبيات",
    totalRevenue: "مجموع المداخيل",
    pendingOrders: "الطلبيات المعلقة",
    recentProducts: "المنتجات الجديدة",
    recentOrders: "الطلبيات الجديدة",
    quickActions: "إجراءات سريعة",
    addNewProduct: "زيد منتج جديد",
    manageOrders: "دير الطلبيات",
    viewWebsite: "شوف الموقع",

    // Product Management
    productManagement: "تدبير المنتجات",
    addProduct: "زيد منتج",
    backToAdmin: "رجع للإدارة",
    confirmDeleteProduct: "واش متأكد باغي تحيد هاد المنتج؟",

    // Order Management
    orderManagement: "تدبير الطلبيات",
    orders: "طلبيات",
    searchOrders: "قلب على الطلبيات...",
    allStatuses: "جميع الحالات",
    pending: "معلق",
    shipped: "مشحون",
    delivered: "وصل",
    cancelled: "ملغي",
    customerInfo: "معلومات الزبون",
    orderItems: "حاجات الطلبية",
    orderTotal: "مجموع الطلبية",
    shippingAddress: "عنوان التوصيل",
    noOrdersFound: "ماكاين حتى طلبية",

    // Product Form
    basicInformation: "المعلومات الأساسية",
    productName: "سمية المنتج",
    description: "الوصف",
    pricingAndCategory: "الثمن والنوع",
    category: "النوع",
    featuredProduct: "منتج مميز",
    colorsAndSizes: "الألوان والقياسات",
    availableColors: "الألوان المتاحة",
    availableSizes: "القياسات المتاحة",
    colorName: "سمية اللون",
    sizeNumber: "رقم القياس",
    addColor: "زيد لون",
    addSize: "زيد قياس",
    cancel: "إلغاء",
    saveProduct: "احفظ المنتج",
    saving: "كنحفظ...",

    // Order Confirmation
    newOrder: "طلبية جديدة",
    orderItems: "حاجات الطلبية",
    notes: "ملاحظات",
    none: "ماكاين",
    backToHome: "رجع للداخلة",

    // Trust & Security
    secureCheckout: "خلاص آمن",
    freeShipping: "توصيل بلاش",
    easyReturns: "إرجاع سهل",

    // Hero Section
    heroTitle: "بابوش مغربي أصيل",
    heroSubtitle: "اكتشف الخليط المثالي بين الصناعة التقليدية والراحة العصرية مع البلاغي المصنوعة بيد.",
    shopNow: "تسوق دابا",
    learnMore: "عرف كتر",

    // Actions
    viewAll: "شوف الكل",

    // Contact and WhatsApp related translations
    contactUs: "تواصل معانا",
    contactDescription: "تواصل معانا لأي أسئلة على البلاغي ديالنا",
    sendMessage: "صيفط رسالة",
    subject: "الموضوع",
    message: "الرسالة",
    sendViaWhatsApp: "صيفط في واتساب",
    contactForm: "فورم التواصل",
    callUs: "عيط لينا في وقت الخدمة",
    emailUs: "صيفط لينا إيميل في أي وقت",
    visitUs: "زور الورشة ديالنا",
    businessHours: "ساعات الخدمة",
    mondayToFriday: "الاثنين للجمعة",
    saturday: "السبت",
    closedSunday: "مسدود نهار الحد",
    quickContact: "تواصل سريع",
    productQuestions: "أسئلة المنتجات",
    orderSupport: "دعم الطلبيات",
    shippingInfo: "معلومات التوصيل",
    generalHelp: "مساعدة عامة",
    preferWhatsApp: "كتفضل واتساب؟",
    fasterResponse: "تلقى أجوبة أسرع في واتساب",
    help: "مساعدة",
    responseTime: "وقت الجواب",
    within24Hours: "خلال 24 ساعة",
  },
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  const isRTL = language === "ar" || language === "darija"

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("moroccan-language", lang)

    // Update document direction
    document.documentElement.dir = lang === "ar" || lang === "darija" ? "rtl" : "ltr"
    document.documentElement.lang = lang
  }

  // Load language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("moroccan-language") as Language
    if (savedLanguage && ["en", "ar", "fr", "darija"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  return <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
