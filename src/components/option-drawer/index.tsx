import type { ComponentProps } from 'react';
import { Fragment } from 'react';

import { useOptionDrawer } from './hooks';
import { BooleanOptionItem, ChoiceOptionItem, NumberOptionItem } from './parts';

export function OptionDrawer({
  children,
}: Pick<ComponentProps<'div'>, 'children'>) {
  const { editableOptions, setPrettierOptions } = useOptionDrawer();

  return (
    <div className="drawer md:drawer-open">
      <input
        id="option-drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
      />
      <div
        className="drawer-content flex h-screen flex-col items-center
          justify-center"
      >
        {children}
      </div>
      <div className="drawer-side">
        <div className="min-h-full bg-base-200 p-4 text-base-content">
          <ul className="flex w-80 flex-col p-2">
            {editableOptions.map((option) => (
              <Fragment key={option.name}>
                {option.type === 'boolean' && (
                  <BooleanOptionItem option={option} />
                )}
                {option.type === 'number' && (
                  <NumberOptionItem option={option} />
                )}
                {option.type === 'choice' && (
                  <ChoiceOptionItem option={option} />
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
