import React from "react";
import "./Menu.css";

// Importing images
import chickenSatay from "./Chicken Satay.jpg";
import chickenWing from "./Chicken Wing.jpg";
import porkSisig from "./Pork Sisig.jpg";
import crispyPata from "./Crispy Pata.jpg";
import sambalOmelette from "./Sambal Omelette.JPG";
import chapchaeNoodles from "./Chapchae Noodles.jpg";
import pancitCantonSotanghon from "./Pancit Canton-Sotanghon.jpg";
import nanayFelyChickenKinulob from "./Chicken Kinulob.jpg";
import bestSellerTNFSteak from "./Steak.jpg";
import truffleFries from "./Truffle Fries.jpg";
import beefNachos from "./Beef Nachos.jpg";
import barkadaNachos from "./Barkada Nachos.jpg";
import baconWrapSausage from "./Bacon Wrap Sausage.jpg";
import chickenQuesadilla from "./Chicken Quesadilla.jpg";
import beefQuesadilla from "./Beef Quesadilla.jpg";
import fishAndChips from "./Fish & Chips.jpg";
import calamares from "./Calamares w Aioli.jpg";
import cowboySpringRoll from "./Cowboy Spring Roll.jpg";
import chicharongBulaklak from "./Chicharong Bulaklak.jpg";

const Menu = () => {
  const menuSections = [
    {
      title: "MAIN ENTREE",
      id: "main-entree",
      items: [
        {
          name: "Chicken Satay",
          price: "P 300",
          description: "Grilled & marinated in spices served with rich peanut sauce.",
          image: chickenSatay,
        },
        {
          name: "Chicken Wing",
          price: "P 350",
          description: "Juicy wings packed with your favorite flavor.",
          image: chickenWing,
        },
        {
          name: "Pork Sisig",
          price: "P 350",
          description: "Tangy and savory, marinated in calamansi, ginger, onion & soy sauce.",
          image: porkSisig,
        },
        {
          name: "Crispy Pata",
          price: "P 700 - P 1,000",
          description: "Crispy, golden perfection in two sizes: small and large.",
          image: crispyPata,
        },
        {
          name: "Sambal Omelette",
          price: "Platter P 180 | Buffet P 600",
          description: "Fluffy egg with onion, bell pepper, tomato & laksa - perfect for sharing.",
          image: sambalOmelette,
        },
        {
          name: "Chapchae Noodles",
          price: "Platter P 200 | Buffet P 1,000",
          description: "Korean-style sweet and savory noodles for 1-2 or the whole group.",
          image: chapchaeNoodles,
        },
        {
          name: "Pancit Canton-Sotanghon",
          price: "Platter P 200 | Buffet P 1,000",
          description: "A fusion of classic noodles perfect for any occasion.",
          image: pancitCantonSotanghon,
        },
        {
          name: "Nanay Fely's Chicken Kinulob",
          price: "P 600",
          description: "Tender chicken simmered to flavorful perfection.",
          image: nanayFelyChickenKinulob,
        },
        {
          name: "Best Seller TNF Steak",
          price: "P 1,200",
          description: "Beef tenderloin steak served with chimichurri, churrasco, or demi-glaze. Comes with sautéed potato & smoked paprika.",
          image: bestSellerTNFSteak,
        },
      ],
    },
    {
      title: "APPETIZER",
      id: "appetizers",
      items: [
        {
          name: "Truffle Fries",
          price: "P 250",
          description: "Crispy potato fries infused with aromatic truffle oil.",
          image: truffleFries,
        },
        {
          name: "Beef Nachos",
          price: "P 250",
          description: "Loaded nachos with cheese sauce, pickled chili, and ground beef.",
          image: beefNachos,
        },
        {
          name: "Barkada Nachos",
          price: "P 650",
          description: "The ultimate nachos platter for your barkada hangout.",
          image: barkadaNachos,
        },
        {
          name: "Bacon Wrap Sausage",
          price: "P 375",
          description: "Swiss sausage wrapped in crispy bacon served with cocktail sauce.",
          image: baconWrapSausage,
        },
        {
          name: "Chicken Quesadilla",
          price: "P 250",
          description: "Mexican wrap with tomato, jalapeño, and gooey cheese.",
          image: chickenQuesadilla,
        },
        {
          name: "Beef Quesadilla",
          price: "P 350",
          description: "Rich beef filling with jalapeño and cheese in a warm wrap.",
          image: beefQuesadilla,
        },
        {
          name: "Fish & Chips",
          price: "P 300",
          description: "Golden fried fish fillet with fries and a side of garlic mayo.",
          image: fishAndChips,
        },
        {
          name: "Calamares w/ Aioli",
          price: "P 350",
          description: "Crispy calamari rings paired with creamy garlic aioli sauce.",
          image: calamares,
        },
        {
          name: "Cowboy Spring Roll",
          price: "P 300",
          description: "Mexican-inspired beef, bell pepper, coriander, paprika & cheese.",
          image: cowboySpringRoll,
        },
        {
          name: "Chicharong Bulaklak",
          price: "P 300",
          description: "Deep-fried delicacy served with tangy pinakurat sauce.",
          image: chicharongBulaklak,
        },
      ],
    },
  ];

  return (
    <div className="menu-container">
      <header className="menu-header">
        <h1>Grazing Table & Cabinet</h1>
        <p className="tagline">Crafted Elegance, Exquisite Flavors</p>
        <nav className="navigation">
          <a href="#main-entree">Main Entree</a>
          <a href="#appetizers">Appetizers</a>
          <a href="#rates">Rates</a>
        </nav>
      </header>

      {/* Rendering Menu Sections */}
      {menuSections.map((section) => (
        <section key={section.id} id={section.id} className="menu-section">
          <h2 className="section-title">{section.title}</h2>
          {section.items.map((item, idx) => (
            <div key={idx} className="menu-item">
              <div className="menu-item-header">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">{item.price}</p>
              </div>
              <img src={item.image} alt={item.name} className="menu-item-image" />
              <p className="item-description">{item.description}</p>
            </div>
          ))}
        </section>
      ))}

      <section className="menu-section">
        <h2 className="section-title">Grazing Varieties</h2>
        <ul className="menu-list">
          <li>🥩 Premium Cold Cuts</li>
          <li>🧀 Premium Cheeses</li>
          <li>🔥 Grilled Steak</li>
          <li>🦐 Prawn Thermidor</li>
          <li>🍇 Seasoned Fresh Fruits</li>
          <li>🍰 Assorted Pastries</li>
          <li>🍔 Mini Burgers</li>
          <li>🥪 Sandwiches</li>
          <li>🥓 Ham & Cheese Rolls</li>
          <li>🍞 Home Made & Freshly Baked Breads</li>
          <li>🌮 Nachos</li>
          <li>🍣 Maki Rolls, Nigiri, Sashimi</li>
          <li>🥟 Assorted Dim Sum</li>
          <li>🌯 Tortilla Rolls</li>
        </ul>
      </section>

      <section id="rates" className="menu-section">
        <h2 className="section-title">Grazing Rates</h2>
        <div className="rates">
          <div className="rate-item">
            <p className="rate-price">PHP 55,000.00</p>
            <p className="rate-desc">Good for 100 pax</p>
          </div>
          <div className="rate-item">
            <p className="rate-price">PHP 75,000.00</p>
            <p className="rate-desc">Good for 150 pax</p>
          </div>
          <div className="rate-item">
            <p className="rate-price">PHP 95,000.00</p>
            <p className="rate-desc">Good for 200 pax</p>
          </div>
          <div className="rate-item">
            <p className="rate-price">PHP 120,000.00</p>
            <p className="rate-desc">Good for 250 pax</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
