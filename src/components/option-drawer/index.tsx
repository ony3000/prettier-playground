import type { ComponentProps } from 'react';

export function OptionDrawer({
  children,
}: Pick<ComponentProps<'div'>, 'children'>) {
  return (
    <div className="drawer md:drawer-open">
      <input
        id="option-drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col items-center justify-center">
        {children}
      </div>
      <div className="drawer-side">
        <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
