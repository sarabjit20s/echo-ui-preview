import { Link, LinkProps } from 'expo-router';

import { Text } from './ui/Text';
import { Icon } from './ui/Icon';
import { List, ListGroup, ListItem } from './List';

type Example = {
  name: string;
  href: LinkProps['href'];
};

const examples: Example[] = [
  {
    name: 'Text',
    href: '/examples/text',
  },
  {
    name: 'Icon',
    href: '/examples/icon',
  },
  {
    name: 'Spinner',
    href: '/examples/spinner',
  },
  {
    name: 'Separator',
    href: '/examples/separator',
  },
  {
    name: 'Button',
    href: '/examples/button',
  },
  {
    name: 'Button Group',
    href: '/examples/button-group',
  },
  {
    name: 'Icon Button',
    href: '/examples/icon-button',
  },
  {
    name: 'Avatar',
    href: '/examples/avatar',
  },
  {
    name: 'Accordion',
    href: '/examples/accordion',
  },
  {
    name: 'Checkbox',
    href: '/examples/checkbox',
  },
  {
    name: 'Radio Group',
    href: '/examples/radio-group',
  },
  {
    name: 'Text Input',
    href: '/examples/text-input',
  },
  {
    name: 'Text Area',
    href: '/examples/text-area',
  },
  {
    name: 'Alert',
    href: '/examples/alert',
  },
  {
    name: 'Popup',
    href: '/examples/popup',
  },
  {
    name: 'Popover',
    href: '/examples/popover',
  },
];

export default function ExampleList() {
  return (
    <List>
      <ListGroup>
        {examples
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ name, href }, i) => {
            return (
              <Link key={i} href={href} asChild>
                <ListItem>
                  <Text variant="labelMd" highContrast>
                    {name}
                  </Text>
                  <Icon name="chevron-forward" highContrast />
                </ListItem>
              </Link>
            );
          })}
      </ListGroup>
    </List>
  );
}
