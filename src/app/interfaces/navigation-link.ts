export interface IAppNavigationLink {
  link: string;
  isRendered: boolean;
  class: string;
  type: 'link' | 'button';
  title: string;
  icon: string;
  click?: () => void;
}
