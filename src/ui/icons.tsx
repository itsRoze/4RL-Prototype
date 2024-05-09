export type Icon = {
  size?: number;
  color?: string;
  customClass?: string;
};

export const IconLogout: React.FC<Icon> = ({
  size = 18,
  color,
  customClass,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-log-out ${customClass || ""}`}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
};

export const IconHome: React.FC<Icon> = ({ size = 18, color, customClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-qr-code ${customClass || ""}`}
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  );
};

export const IconBell: React.FC<Icon> = ({ size = 18, color, customClass }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${customClass || ""}`}
    >
      <path d="M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      <circle cx="18" cy="8" r="3" fill="#886D99" stroke="#996CB7" />
    </svg>
  );
};

export const IconCamera: React.FC<Icon> = ({
  size = 18,
  color,
  customClass,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${customClass || ""}`}
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
};

export const Icon8Ball: React.FC<Icon> = ({
  size = 18,
  color,
  customClass,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${customClass || ""}`}
    >
      <circle cx="12" cy="12" r="11.5" />
      <circle cx="12" cy="12" r="5.5" />
      <path
        d="M11.9997 15.024C11.653 15.024 11.3357 14.952 11.0477 14.808C10.765 14.6587 10.5384 14.4613 10.3677 14.216C10.197 13.9653 10.1117 13.6907 10.1117 13.392C10.1117 13.2267 10.1357 13.072 10.1837 12.928C10.237 12.7787 10.3117 12.6427 10.4077 12.52C10.509 12.392 10.6317 12.2773 10.7757 12.176C10.9197 12.0693 11.085 11.9787 11.2717 11.904L11.2237 12.072C11.0797 12.0293 10.949 11.968 10.8317 11.888C10.7144 11.808 10.6157 11.7173 10.5357 11.616C10.4557 11.5093 10.3944 11.3947 10.3517 11.272C10.309 11.144 10.2877 11.0133 10.2877 10.88C10.2877 10.608 10.3624 10.36 10.5117 10.136C10.6664 9.912 10.8717 9.73333 11.1277 9.6C11.389 9.46667 11.6797 9.4 11.9997 9.4C12.3144 9.4 12.5997 9.46667 12.8557 9.6C13.117 9.73333 13.3224 9.912 13.4717 10.136C13.6264 10.36 13.7037 10.608 13.7037 10.88C13.7037 11.0133 13.6824 11.1413 13.6397 11.264C13.6024 11.3867 13.5437 11.5013 13.4637 11.608C13.3837 11.7093 13.2824 11.8 13.1597 11.88C13.0424 11.96 12.909 12.024 12.7597 12.072L12.7357 11.936C12.9064 11.9947 13.061 12.0773 13.1997 12.184C13.3437 12.2853 13.4664 12.4 13.5677 12.528C13.669 12.656 13.7464 12.7947 13.7997 12.944C13.8584 13.088 13.8877 13.2373 13.8877 13.392C13.8877 13.696 13.8024 13.9733 13.6317 14.224C13.4664 14.4693 13.2397 14.664 12.9517 14.808C12.669 14.952 12.3517 15.024 11.9997 15.024ZM11.9997 14.432C12.2397 14.432 12.453 14.3867 12.6397 14.296C12.8317 14.2 12.981 14.072 13.0877 13.912C13.1997 13.752 13.2557 13.5733 13.2557 13.376C13.2557 13.1733 13.1997 12.9947 13.0877 12.84C12.981 12.68 12.8317 12.5547 12.6397 12.464C12.453 12.368 12.2397 12.32 11.9997 12.32C11.7597 12.32 11.5437 12.368 11.3517 12.464C11.165 12.5547 11.0157 12.68 10.9037 12.84C10.797 12.9947 10.7437 13.1733 10.7437 13.376C10.7437 13.5733 10.797 13.752 10.9037 13.912C11.0157 14.0667 11.165 14.192 11.3517 14.288C11.5437 14.384 11.7597 14.432 11.9997 14.432ZM11.9997 11.784C12.2024 11.784 12.3837 11.7467 12.5437 11.672C12.709 11.5973 12.837 11.4933 12.9277 11.36C13.0237 11.2267 13.0717 11.072 13.0717 10.896C13.0717 10.7253 13.0237 10.5733 12.9277 10.44C12.837 10.3013 12.709 10.192 12.5437 10.112C12.3837 10.032 12.2024 9.992 11.9997 9.992C11.7917 9.992 11.605 10.032 11.4397 10.112C11.2797 10.192 11.1517 10.3013 11.0557 10.44C10.965 10.5733 10.9197 10.7253 10.9197 10.896C10.9197 11.0667 10.965 11.2213 11.0557 11.36C11.1517 11.4933 11.2797 11.5973 11.4397 11.672C11.605 11.7467 11.7917 11.784 11.9997 11.784Z"
        fill="black"
      />
      <path d="M12 3C7.74969 3.02259 3.55735 6.30231 3.5 11" />
      <circle cx="3.5" cy="13" r="0.25" />
    </svg>
  );
};

export const IconCrystalBall: React.FC<Icon> = ({
  size = 18,
  color,
  customClass,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${customClass || ""}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6.73 17.018a8 8 0 1 1 10.54 0" />
      <path d="M5 19a2 2 0 0 0 2 2h10a2 2 0 1 0 0 -4h-10a2 2 0 0 0 -2 2z" />
      <path d="M11 7a3 3 0 0 0 -3 3" />
    </svg>
  );
};
