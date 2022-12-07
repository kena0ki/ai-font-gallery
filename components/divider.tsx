type Props = {
  strokeWidth?: number
  color?: string
}

export default function Divider({ strokeWidth, color }: Props) {
  return (
    <svg width="100%" height="9" viewBox="0 0 690 9" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path stroke={color||"black"} strokeWidth={strokeWidth||3} strokeLinecap="round" d="M2 5.33333C78.5294 5.33333 153.841 2 230.333 2C296.219 2 361.331 7 426.689 7C454.791 7 482.892 7 510.993 7C532.41 7 553.026 3.66667 573.89 3.66667C610.752 3.66667 650.798 3.66667 687 3.66667" />
    </svg>
  );
}
