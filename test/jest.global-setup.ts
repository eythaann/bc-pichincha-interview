import classNames from 'classnames';

module.exports = () => {
  global.cx = classNames;

  const root = document.createElement('div');
  root.id = 'tooltip-root';
  document.body.appendChild(root);
};