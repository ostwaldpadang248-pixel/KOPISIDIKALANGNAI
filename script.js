const PRODUCTS_KEY = 'ks_products_v1';

function sampleProducts(){
  return [
    {
      id: 'robusta',
      name: 'Robusta Sidikalang',
      image: 'uploads/BATANG KOPI.jpeg',
      video: '',
      description: 'Karakter rasa kuat dan bold. Aroma khas dan seimbang. Cocok untuk pecinta kopi hitam.',
      story: 'Robusta Sidikalang tumbuh subur di perbukitan dan diproses secara tradisional oleh petani lokal, menghasilkan rasa kuat yang autentik.'
    },
    {
      id: 'arabika',
      name: 'Arabika Sidikalang',
      image: 'uploads/BERBUAH KOPI.jpeg',
      video: '',
      description: 'Rasa coklat. Aftertaste seperti black tea. Lebih smooth tapi tetap kompleks.',
      story: 'Arabika Sidikalang melewati proses panjang dan penuh tantangan, namun menghasilkan rasa elegan yang cocok untuk penikmat kopi premium.'
    }
  ];
}

async function fetchProducts(){
  try{
    const res = await fetch('/api/products');
    if(res.ok) return await res.json();
  }catch(e){
    console.warn('fetch /api/products failed, trying local products.json', e);
  }

  try{
    const res = await fetch('products.json');
    if(res.ok) return await res.json();
  }catch(e){
    console.error('fetch products.json failed', e);
  }

  return sampleProducts();
}

async function renderProducts(){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  const products = await fetchProducts();
  grid.innerHTML = '';
  products.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'product-card';
    const media = document.createElement(p.video? 'video':'img');
    media.className = 'product-media';
    if(p.video){
      media.src = p.video;
      media.controls = true;
    }else{
      media.src = p.image || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%234b2e2a"/></svg>';
      media.alt = p.name;
    }
    const body = document.createElement('div');
    body.className = 'product-body';
    const h = document.createElement('h4'); h.textContent = p.name;
    const desc = document.createElement('p'); desc.textContent = p.description;
    const story = document.createElement('small'); story.textContent = p.story;
    body.appendChild(h); body.appendChild(desc); body.appendChild(story);
    card.appendChild(media); card.appendChild(body);
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts();
  // try to refresh periodically
  setInterval(renderProducts, 15_000);
});
