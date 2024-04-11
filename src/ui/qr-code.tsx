import QRCode from "react-qr-code";

interface Props {
  path: string;
}

const QRCodeProfile: React.FC<Props> = ({ path }) => {
  return (
    <QRCode
      size={256}
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      value={process.env.NEXT_PUBLIC_DOMAIN + path}
      viewBox={`0 0 256 256`}
      bgColor="#66000000"
    />
  );
};

export default QRCodeProfile;
