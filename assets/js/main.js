(function(){
  const year = document.querySelector('[data-year]');
  if(year) year.textContent = new Date().getFullYear();

  const forms = document.querySelectorAll('.needs-validation');
  forms.forEach(form => {
    form.addEventListener('submit', function(event){
      if(!form.checkValidity()){
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        const alert = form.querySelector('.form-success');
        if(alert) alert.classList.remove('d-none');
      }
      form.classList.add('was-validated');
    }, false);
  });

  const counters = document.querySelectorAll('[data-count]');
  const animate = el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1100;
    let start = null;
    const step = timestamp => {
      if(!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value + suffix;
      if(progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !entry.target.dataset.done){
        entry.target.dataset.done = 'true';
        animate(entry.target);
      }
    });
  }, {threshold:.6});
  counters.forEach(c => observer.observe(c));
})();
