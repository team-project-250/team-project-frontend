import type { EquipmentType } from "./EquipmentType";

export interface EquipmentDetails extends EquipmentType {
  images: string[];
  specifications: string[];
  equipment: string[];
}