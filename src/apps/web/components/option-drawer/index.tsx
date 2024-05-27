import type { ComponentProps } from 'react';
import { useCallback, Fragment } from 'react';

import { useOptionDrawer } from './hooks';
import { BooleanOptionItem, ChoiceOptionItem, NumberOptionItem } from './parts';
import type { EditableOption } from './types';

export function OptionDrawer({
  children,
}: Pick<ComponentProps<'div'>, 'children'>) {
  const { editableOptions, setPrettierOptions } = useOptionDrawer();

  const updatePrettierOptions = useCallback(
    (option: EditableOption, newValue: EditableOption['defaultValue']) =>
      setPrettierOptions((prevOptions) => ({
        ...prevOptions,
        [option.name]: newValue,
      })),
    [setPrettierOptions],
  );

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
                  <BooleanOptionItem
                    option={option}
                    onChange={(newValue) =>
                      updatePrettierOptions(option, newValue)
                    }
                  />
                )}
                {option.type === 'number' && (
                  <NumberOptionItem
                    option={option}
                    onChange={(newValue) =>
                      updatePrettierOptions(option, newValue)
                    }
                  />
                )}
                {option.type === 'choice' && (
                  <ChoiceOptionItem
                    option={option}
                    onChange={(newValue) =>
                      updatePrettierOptions(option, newValue)
                    }
                  />
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
