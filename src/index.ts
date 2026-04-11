import "./styles/base.css";

// ── Utils ──────────────────────────────────────────────────────────────────────
export { cx } from "./utils/cx";
export type { CxValue } from "./utils/cx";
export type { NixUIChildren } from "./utils/types";

// ── Accessibility Utilities ────────────────────────────────────────────────────
export {
    nixId,
    nixIdRegistry,
    nixFocusTrap,
    nixFocusRestore,
    nixDismissable,
    nixRovingTabindex,
    nixAriaDescribedby,
    nixLiveRegion,
    nixKeyboardSlider,
    nixSliderValueText,
} from "./utils/a11y";
export type {
    FocusTrapOptions,
    FocusRestoreOptions,
    DismissableOptions,
    RovingTabindexOptions,
    LiveRegionLevel,
} from "./utils/a11y/types";

// ── Components ─────────────────────────────────────────────────────────────────
export { Button } from "./components/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button";

export { Input } from "./components/Input";
export type { InputProps, InputType, InputSize } from "./components/Input";

export { Textarea } from "./components/Textarea";
export type { TextareaProps } from "./components/Textarea";

export { Select } from "./components/Select";
export type { SelectProps, SelectOption } from "./components/Select";

export { Checkbox } from "./components/Checkbox";
export type { CheckboxProps } from "./components/Checkbox";

export { Toggle } from "./components/Toggle";
export type { ToggleProps } from "./components/Toggle";

export { Badge } from "./components/Badge";
export type { BadgeProps, BadgeVariant, BadgeSize } from "./components/Badge";

export { Breadcrumb } from "./components/Breadcrumb";
export type { BreadcrumbProps, BreadcrumbItem } from "./components/Breadcrumb";

export { Card, CardHeader, CardBody, CardFooter } from "./components/Card";
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from "./components/Card";

export { DataTable } from "./components/DataTable";
export type { DataTableProps, DataTableColumn } from "./components/DataTable";

export { Dropdown } from "./components/Dropdown";
export type { DropdownProps, DropdownItem, DropdownPosition } from "./components/Dropdown";

export { Modal, createModal } from "./components/Modal";
export type { ModalProps, ModalSize } from "./components/Modal";

export { Progress } from "./components/Progress";
export type { ProgressProps, ProgressVariant, ProgressSize } from "./components/Progress";

export { Skeleton } from "./components/Skeleton";
export type { SkeletonProps, SkeletonVariant } from "./components/Skeleton";

export { Spinner } from "./components/Spinner";
export type { SpinnerProps, SpinnerSize, SpinnerVariant } from "./components/Spinner";

export { Alert } from "./components/Alert";
export type { AlertProps, AlertVariant } from "./components/Alert";

export { Avatar } from "./components/Avatar";
export type { AvatarProps, AvatarSize } from "./components/Avatar";

export { Tooltip } from "./components/Tooltip";
export type { TooltipProps, TooltipPosition } from "./components/Tooltip";

export { Tabs } from "./components/Tabs";
export type { TabsProps, TabItem, TabsVariant } from "./components/Tabs";

export { Accordion } from "./components/Accordion";
export type { AccordionProps, AccordionItem } from "./components/Accordion";

export { ToastContainer, showToast, dismissToast, clearToasts, setToastPosition } from "./components/Toast";
export type { ToastItem, ToastType, ToastPosition, ToastOptions } from "./components/Toast";

export { RadioGroup } from "./components/RadioGroup";
export type { RadioGroupProps, RadioOption } from "./components/RadioGroup";

export { Slider } from "./components/Slider";
export type { SliderProps } from "./components/Slider";

export { Drawer } from "./components/Drawer";
export type { DrawerProps } from "./components/Drawer";

export { Pagination } from "./components/Pagination";
export type { PaginationProps } from "./components/Pagination";

export { Rating } from "./components/Rating";
export type { RatingProps } from "./components/Rating";
