"use client"

import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"
import Button from "../button/Button"
import { useTranslations } from "next-intl";
import { useFilterModalStore } from "@/store/useFilterModalStore";

export default  function MarketplaceButton() {
     const t = useTranslations("MarketplacePage");
     const {openFilterModal} = useFilterModalStore();
  return (
    <Button
                onClick={openFilterModal}
                variant="outline"
                icon={<HiOutlineAdjustmentsHorizontal size={20} />}
              >
                {t("filter")}
              </Button>
  )
}
