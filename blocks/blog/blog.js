/**
 * Blog Block - Handles blog listing, filtering, and card rendering
 */

export default async function decorate(block) {
  const blogContent = block.querySelector('div');
  
  // Create blog section structure
  const section = document.createElement('div');
  section.className = 'blog-section';

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'blog-wrapper';

  // Create header
  const header = document.createElement('div');
  header.className = 'blog-header';
  header.innerHTML = `
    <div>
      <h2>Latest Blog Posts</h2>
    </div>
    <p>Discover insights, tips, and stories from our team. Stay updated with the latest trends and best practices.</p>
  `;

  // Create filter buttons
  const filtersContainer = document.createElement('div');
  filtersContainer.className = 'blog-filters';
  
  const categories = ['All', 'Development', 'Design', 'Business', 'Tutorial'];
  categories.forEach((category) => {
    const btn = document.createElement('button');
    btn.className = `blog-filter-btn ${category === 'All' ? 'active' : ''}`;
    btn.textContent = category;
    btn.dataset.category = category.toLowerCase();
    btn.addEventListener('click', () => filterBlogPosts(category, section));
    filtersContainer.appendChild(btn);
  });

  // Create blog grid
  const grid = document.createElement('div');
  grid.className = 'blog-grid';
  grid.id = 'blog-grid';

  // Sample blog data (can be replaced with dynamic data from API)
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Modern Web Development',
      category: 'development',
      date: 'Oct 8, 2026',
      excerpt: 'Learn the fundamentals of modern web development and best practices.',
      link: '#',
    },
    {
      id: 2,
      title: 'UI/UX Design Trends 2026',
      category: 'design',
      date: 'Oct 6, 2026',
      excerpt: 'Explore the latest design trends shaping the digital landscape.',
      link: '#',
    },
    {
      id: 3,
      title: 'Business Growth Strategies',
      category: 'business',
      date: 'Oct 4, 2026',
      excerpt: 'Proven strategies to scale your business and boost revenue.',
      link: '#',
    },
    {
      id: 4,
      title: 'JavaScript Best Practices',
      category: 'development',
      date: 'Oct 2, 2026',
      excerpt: 'Master essential JavaScript patterns for clean and efficient code.',
      link: '#',
    },
    {
      id: 5,
      title: 'Responsive Design Guide',
      category: 'design',
      date: 'Sep 30, 2026',
      excerpt: 'Create responsive websites that work seamlessly across all devices.',
      link: '#',
    },
    {
      id: 6,
      title: 'CSS Grid Complete Tutorial',
      category: 'tutorial',
      date: 'Sep 28, 2026',
      excerpt: 'Master CSS Grid layout system with practical examples.',
      link: '#',
    },
  ];

  // Render blog cards
  function renderBlogCards(posts) {
    grid.innerHTML = '';
    posts.forEach((post) => {
      const card = createBlogCard(post);
      grid.appendChild(card);
    });
  }

  // Create individual blog card
  function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.dataset.category = post.category;
    
    card.innerHTML = `
      <div class="blog-card-image">
        ${post.category.toUpperCase()}
      </div>
      <div class="blog-card-content">
        <div class="blog-meta">
          <span class="blog-tag">${post.category}</span>
          <span class="blog-date">${post.date}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="${post.link}" class="blog-card-link">Read More →</a>
      </div>
    `;
    
    return card;
  }

  // Filter blog posts by category
  function filterBlogCards(category) {
    const cards = grid.querySelectorAll('.blog-card');
    cards.forEach((card) => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Update active filter button
  function updateActiveFilter(category) {
    const buttons = filtersContainer.querySelectorAll('.blog-filter-btn');
    buttons.forEach((btn) => {
      if (btn.dataset.category === category.toLowerCase()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Filter blog posts handler
  function filterBlogPosts(category, sectionElement) {
    filterBlogCards(category);
    updateActiveFilter(category);
  }

  // Initial render
  renderBlogCards(blogPosts);

  // Assemble the blog section
  wrapper.appendChild(header);
  wrapper.appendChild(filtersContainer);
  wrapper.appendChild(grid);
  section.appendChild(wrapper);

  // Replace block content
  block.replaceChildren(section);
}
