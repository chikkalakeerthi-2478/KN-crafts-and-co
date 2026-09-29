export interface KnowledgeAnswer {
  reply: string;
  matchedCategory?: string;
  suggestedAction?: {
    label: string;
    url?: string;
    actionType?: 'whatsapp' | 'custom_order' | 'catalog';
  };
}

export function getStudioKnowledgeResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // 1. Lamp queries
  if (q.includes('lamp') || q.includes('light') || q.includes('night') || q.includes('fairy bell') || q.includes('glow')) {
    return (
      "🪔 **Handmade Floral Night Lamps**\n\n" +
      "We offer two signature glowing floral lamps:\n" +
      "1. **Fairy Bell Night Lamp ($46)**: 7 hand-sculpted white & mint lily-of-the-valley bell flowers with warm micro-LEDs inside a borosilicate glass cloche on a solid beechwood base. Powered by dual USB or AAA batteries.\n" +
      "2. **Celestial Twilight Table Lamp ($52)**: Shaded periwinkle hydrangea clusters with touch-dimmable warm LEDs on solid oak.\n\n" +
      "💡 *They provide a cozy, relaxing warm bedroom ambiance and everlasting beauty that never fades!*"
    );
  }

  // 2. Bouquet & Flower queries
  if (q.includes('bouquet') || q.includes('flower') || q.includes('rose') || q.includes('tulip') || q.includes('daisy') || q.includes('sunflower')) {
    return (
      "💐 **Everlasting Pipe-Cleaner Floral Collections**\n\n" +
      "Unlike real flowers that wilt in days, our blooms are 100% hand-twisted from velvety plush chenille with bendable floral wire cores:\n" +
      "• **Whimsical Spring Pastel Bouquet ($38)**: 5 pastel tulips, 3 golden daisies, and lavender sprigs in artisan wrapping.\n" +
      "• **Petite Ceramic Tulip & Sunflower Pot ($24)**: Everlasting desk garden in a matte white ceramic pot with natural moss.\n" +
      "• **Graduation Bear & Sunflower Keepsake ($42)**: Scholar teddy bear with mortarboard & bright sunflowers.\n" +
      "• **Single Stem Collector Roses ($9 each)**: Available in Dusty Rose, Buttercup, Lilac Fog, and Vintage Sage.\n\n" +
      "✨ *Hypoallergenic (zero pollen) and stems can be gently repositioned!*"
    );
  }

  // 3. Keychain & Animal charm queries
  if (q.includes('keychain') || q.includes('charm') || q.includes('bear') || q.includes('bunny') || q.includes('frog') || q.includes('animal')) {
    return (
      "🧸 **Chubby Animal Companion Keychains ($14)**\n\n" +
      "Meticulously sculpted by hand with multi-density chenille, hand-stitched bead eyes, and luxury 18K gold-plated swivel lobster clasps.\n" +
      "• **Characters**: Honey Bear, Blush Bunny, and Matcha Frog.\n" +
      "• **Dimensions**: Approx. 7.5cm × 5cm.\n" +
      "• **Custom Pet Sculptures**: We also sculpt custom likenesses of your own dog, cat, or favorite mascot from photos (starting at $32–$35)!"
    );
  }

  // 4. Custom orders & Pet portrait queries
  if (q.includes('custom') || q.includes('personal') || q.includes('pet') || q.includes('dog') || q.includes('cat') || q.includes('photo') || q.includes('order')) {
    return (
      "🎨 **Custom & Personalized Creations**\n\n" +
      "Have a special dream craft or pet in mind? Lead artisan Maya Lin sculpts bespoke creations from scratch:\n" +
      "• **Bespoke Bouquets**: Pick your favorite blooms and color palettes (from $38)\n" +
      "• **Custom Pet Likeness Sculptures**: Upload pet photos to match fur colors and ear shapes (from $32–$35)\n" +
      "• **Turnaround**: Maya reviews your design notes within 2 hours with wire mockups!\n\n" +
      "👉 You can fill out the form in the 'Custom Orders' section on this page, or send photos directly to us on WhatsApp!"
    );
  }

  // 5. Shipping, Delivery & Packaging queries
  if (q.includes('ship') || q.includes('deliver') || q.includes('cost') || q.includes('free') || q.includes('track') || q.includes('pack')) {
    return (
      "🎁 **Shipping & Gift Packaging**\n\n" +
      "• **Free Shipping**: Automatically unlocked on all orders of **$50 or more**!\n" +
      "• **Gift Packaging**: Every single order comes with complimentary standard protective gift packaging.\n" +
      "• **Calligraphy Note**: We include a free handwritten personalized calligraphy card with every bouquet, lamp, and gift set—just tell us your message at checkout."
    );
  }

  // 6. Occasion recommendations
  if (q.includes('occasion') || q.includes('birthday') || q.includes('anniversary') || q.includes('valentine') || q.includes('graduation') || q.includes('gift')) {
    return (
      "🎉 **Gift Recommendations by Occasion**\n\n" +
      "• **Birthdays**: Petite Ceramic Pot & Animal Keychain (Bright, cheerful, lasting)\n" +
      "• **Anniversaries & Valentine's Day**: Eternal Love Signature Gift Hamper ($58) or Spring Bouquet ($38)\n" +
      "• **Friendship / Besties**: Matching Chubby Animal Keychains ($14 ea)\n" +
      "• **Graduation**: Graduation Bear & Sunflower Keepsake ($42)\n" +
      "• **Home Decor & Festivals**: Fairy Bell Night Lamp ($46) with warm ambient micro-LEDs"
    );
  }

  // 7. Care instructions & allergies
  if (q.includes('care') || q.includes('dust') || q.includes('clean') || q.includes('last') || q.includes('wash') || q.includes('water') || q.includes('allerg')) {
    return (
      "🌸 **Care & Longevity**\n\n" +
      "• **No Water Needed**: Do not soak in water or expose to direct flame.\n" +
      "• **Cleaning**: Simply brush gently with a soft makeup brush or use a hairdryer on a cool/low setting.\n" +
      "• **Shape**: Stems and petals contain bendable wire—you can gently adjust and repose them any time.\n" +
      "• **Hypoallergenic**: 100% allergy-free with no pollen or artificial fragrance."
    );
  }

  // 8. Contact, Location, Hours
  if (q.includes('contact') || q.includes('where') || q.includes('location') || q.includes('address') || q.includes('phone') || q.includes('whatsapp') || q.includes('hour')) {
    return (
      "📍 **Twist & Bloom Studio Info**\n\n" +
      "• **Workshop**: Suite 4B, The Old Mill Craft Quarter, Blossom Mews (Visits & pickups by appointment)\n" +
      "• **Hours**: Mon – Sat: 9:00 AM – 6:30 PM (Average response time < 2 hours)\n" +
      "• **Email**: hello@twistandbloomstudio.com\n" +
      "• **WhatsApp**: Click the 'WhatsApp Us' button in the navigation or chat directly with Maya!"
    );
  }

  // Default friendly studio assistant reply
  return (
    "🌸 **Welcome to Twist & Bloom Studio!**\n\n" +
    "I can help you with:\n" +
    "• 💐 **Everlasting Bouquets** ($38) & Ceramic Pots ($24)\n" +
    "• 🪔 **Glowing Fairy Bell Night Lamps** ($46)\n" +
    "• 🧸 **Chubby Animal Keychains** ($14) & Custom Pet Charms ($32)\n" +
    "• 🎁 **Custom orders & Free shipping** on orders over $50\n\n" +
    "Feel free to ask any specific question, or let me know what special occasion you are celebrating!"
  );
}
