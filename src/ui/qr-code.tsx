import QRCode from "react-qr-code";
import { Resource } from "sst";

interface Props {
  path: string;
}

const QRCodeProfile: React.FC<Props> = ({ path }) => {
  return (
    <QRCode
      size={256}
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      value={Resource.PublicDomain.value + path}
      viewBox={`0 0 256 256`}
      bgColor="#66000000"
      fgColor="#4b5563"
    />
  );
};

export default QRCodeProfile;
