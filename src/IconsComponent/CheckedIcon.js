const CheckedIcon = ({size, fill}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={fill}
    viewBox="0 0 22 22"
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M11 21.5a10.5 10.5 0 1 0 0-21 10.5 10.5 0 0 0 0 21Zm-.27-6.253 5.833-7-1.792-1.494-5.017 6.02-2.596-2.598-1.65 1.65 3.5 3.5.904.903.817-.981Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CheckedIcon;