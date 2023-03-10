SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Structure de la table `material`
--
DROP TABLE IF EXISTS `material`;
CREATE TABLE IF NOT EXISTS `material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `brand` int(11) NOT NULL,
  `name` varchar(254) NOT NULL,
  `description` varchar(254) NOT NULL,
  `image` varchar(254) NOT NULL,
  `link` varchar(245) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Contraintes pour la table `material`
--
ALTER TABLE `material` ADD CONSTRAINT `FK_material_materialType` FOREIGN KEY (`type`) REFERENCES `material_type` (`id`);
ALTER TABLE `material` ADD CONSTRAINT `FK_material_materialBrand` FOREIGN KEY (`brand`) REFERENCES `material_brand` (`id`);

--
-- AUTO_INCREMENT pour la table `material`
--
ALTER TABLE `material` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
COMMIT;
