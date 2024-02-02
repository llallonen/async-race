import './header.scss';

export function createHeader(): void {
  const header = document.createElement('header');
  header.classList.add('header');
  header.innerHTML = `
    <div class="container header__wrapper">
      <div class="header__buttons">
        <button class="button header__button button--add">To garage</button>
        <button class="button header__button button--add">To winners</button>
      </div>
      <div class="header__logo logo">
        <h1 class="logo__title">Async race</h1>
      </div>
    </div>`;

  document.body.prepend(header);
}
