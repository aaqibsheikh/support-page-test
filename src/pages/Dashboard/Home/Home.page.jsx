import React from 'react';
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation("/Home/ns");
  return (
    <div className="p-4 md:px-6">
      <h2 className="text-xl font-normal text-white">{t("Dashboard")}</h2>
    </div>
  );
}
export default Home;
