/**
 * Return the display name of the passed Component.
 *
 * @param Element - WrappedComponent
 * @return string
 */
export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
