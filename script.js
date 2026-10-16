const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  mobileNav.hidden = isOpen;
});

mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  mobileNav.hidden = true;
}));

const heroStories = {
  ritual: {
    kicker: 'A little more than coffee',
    title: 'Good things<br>happen over<br>coffee.',
    copy: 'Thoughtfully sourced, slowly roasted, and always better shared.',
    link: 'Discover our coffee',
    linkHref: '#coffee',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=2200&q=88',
    alt: 'Barista pouring freshly brewed coffee in a sunlit café'
  },
  origin: {
    kicker: 'From the places that grow it',
    title: 'A good cup<br>starts<br>somewhere.',
    copy: 'Get to know the people, landscapes, and care behind every harvest.',
    link: 'Follow the journey',
    linkHref: 'journal.html#origin-stories',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=88',
    alt: 'Fresh coffee beans and tools laid out for a careful brew'
  },
  people: {
    kicker: 'There is room at the table',
    title: 'Coffee brings<br>us closer.',
    copy: 'A shared pause, a familiar ritual, a reason to stay a little longer.',
    link: 'Meet our community',
    linkHref: 'journal.html#everyday-rituals',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=2200&q=88',
    alt: 'Friends meeting around a table in a warm, welcoming café'
  }
};
document.querySelectorAll('.hero-story').forEach((tab) => tab.addEventListener('click', () => {
  const story = heroStories[tab.dataset.hero];
  document.querySelectorAll('.hero-story').forEach((item) => {
    item.classList.toggle('active', item === tab);
    item.setAttribute('aria-selected', String(item === tab));
  });
  const heroImage = document.querySelector('.hero-image');
  heroImage.style.opacity = '0.35';
  document.querySelector('#hero-kicker').textContent = story.kicker;
  document.querySelector('#hero-title').innerHTML = story.title;
  document.querySelector('#hero-copy').textContent = story.copy;
  document.querySelector('#hero-link').innerHTML = `${story.link} <span>↗</span>`;
  document.querySelector('#hero-link').href = story.linkHref;
  const storyIndex = [...document.querySelectorAll('.hero-story')].indexOf(tab) + 1;
  document.querySelector('#hero-count').textContent = `0${storyIndex} / 03`;
  window.setTimeout(() => {
    heroImage.onload = () => { heroImage.style.opacity = '1'; };
    heroImage.onerror = () => { heroImage.style.opacity = '1'; };
    heroImage.src = story.image;
    heroImage.alt = story.alt;
  }, 140);
}));

const craftSteps = {
  origin: {
    label: '01 / THE ORIGIN',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85',
    alt: 'Coffee beans being carefully prepared',
    copy: 'It starts with good relationships. We work with producers who know their land deeply, building long-term partnerships and choosing coffees with character.'
  },
  roast: {
    label: '02 / THE ROAST',
    image: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=1400&q=85',
    alt: 'Coffee beans roasting to a deep, rich color',
    copy: 'Our small-batch roasts bring out what is already there: sweetness, depth, and the distinct character of each harvest. Patiently roasted, never rushed.'
  },
  blend: {
    label: '03 / THE BLEND',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1400&q=85',
    alt: 'A barista balancing espresso and milk for a cup of coffee',
    copy: 'A good blend is all about balance. We bring coffees together for cups that feel familiar yet full of little surprises, whether you take it black or with milk.'
  },
  cup: {
    label: '04 / THE CUP',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=85',
    alt: 'A freshly made cup of coffee ready to be shared',
    copy: 'The final step is yours. A quiet first cup, a catch-up with a friend, a pause in a busy day: make it your own and pass the good feeling around.'
  }
};

const craftTabs = [...document.querySelectorAll('.craft-tab')];
craftTabs.forEach((tab) => tab.addEventListener('click', () => {
  const step = craftSteps[tab.dataset.step];
  craftTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  document.querySelector('.craft-description').setAttribute('aria-labelledby', tab.id);
  document.querySelector('.craft-description p').textContent = step.copy;
  const image = document.querySelector('#craft-image');
  image.style.opacity = '0';
  window.setTimeout(() => {
    image.src = step.image;
    image.alt = step.alt;
    document.querySelector('.photo-label').textContent = step.label;
    image.onload = () => { image.style.opacity = '1'; };
  }, 160);
}));

document.querySelector('#newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email');
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }
  const subject = 'Join the Common Ground Coffee newsletter';
  const body = 'Please add ' + email.value + ' to the Common Ground Coffee newsletter.';
  document.querySelector('.form-message').textContent = 'Your email app should open with an email ready to send to Common Ground.';
  window.location.href = 'mailto:hello@commonground.coffee?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const fields = new FormData(form);
  const subject = 'Website enquiry from ' + fields.get('name');
  const body = 'Name: ' + fields.get('name') + '\nEmail: ' + fields.get('email') + '\n\n' + fields.get('message');
  window.location.href = 'mailto:hello@commonground.coffee?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});
