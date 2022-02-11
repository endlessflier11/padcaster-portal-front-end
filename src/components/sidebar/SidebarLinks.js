import styles from './SidebarLinks.module.scss'
import SidebarLink from './SidebarLink';
import MyMediaIcon from '../icons/MyMediaIcon';
import TutorialsIcon from '../icons/TutorialsIcon';
import ContactUsIcon from '../icons/ContactUsIcon';
import React from 'react';
import ViewType from '../../types/ViewType';

const sidebarMenu = [
  {
    text: 'My Media',
    icon: MyMediaIcon,
    type: ViewType.MEDIA
  },
  {
    text: 'Tutorials',
    icon: TutorialsIcon,
    type: ViewType.TUTORIALS
  },
  {
    text: 'Contact Us',
    icon: ContactUsIcon,
    type: ViewType.CONTACT
  },
]

const SidebarLinks = () => {
  return (
    <div className={styles.container}>
      {sidebarMenu.map(({ text, icon, type }, i) => {
        return (
          <SidebarLink
            key={i}
            text={text}
            icon={icon}
            type={type}
          />
        )
      })}
    </div>
  );
}

export default SidebarLinks;

