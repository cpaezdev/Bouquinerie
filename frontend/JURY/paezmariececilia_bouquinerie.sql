-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db.3wa.io
-- Généré le : mar. 22 oct. 2024 à 08:30
-- Version du serveur :  5.7.33-0ubuntu0.18.04.1-log
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `paezmariececilia_bouquinerie`
--

-- --------------------------------------------------------

--
-- Structure de la table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `firstname` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `authors`
--

INSERT INTO `authors` (`id`, `lastname`, `firstname`) VALUES
(5, 'Mastrojanni', 'Michel'),
(8, 'Kruse', 'Max'),
(9, 'Farley', 'Walter'),
(10, 'Wolff', 'Isabel'),
(12, 'Vargas', 'Fred'),
(15, 'Mankell', 'Henning'),
(16, 'King', 'Stephen'),
(18, 'Higgins Clark', 'Mary'),
(20, 'Cook', 'Robin'),
(21, 'Huth', 'Angela'),
(23, 'Verne', 'Jules'),
(25, 'Dumas', 'Alexandre'),
(26, 'Simenon', 'Georges'),
(28, 'Lucazeau', 'Romain'),
(29, 'Guinzburg', ' Michael'),
(32, 'Gallo', 'Max'),
(34, 'Coben', 'Harlan'),
(35, 'London', 'Jack'),
(36, 'Hawkins', 'Paula'),
(37, 'Christie', 'Agatha'),
(38, 'Pancol', 'Katherine'),
(39, 'Troyat', 'Henri'),
(40, 'populaire', 'auteur'),
(41, 'Jagot', 'Paul-Clément'),
(42, 'Grigorieff', 'Dr Gheorghii'),
(43, 'Cauvin', 'Patrick'),
(46, 'De Maupassant', 'Guy'),
(47, 'Dahl', 'Roald'),
(48, 'C.Clarke', 'Arthur'),
(49, 'O\'Connor', 'Deborah'),
(51, 'Walters', 'Minette'),
(52, 'Blondel', 'Jean-Philippe'),
(55, 'Salvatore', 'R. A.'),
(57, 'Cauquetoux', 'Denis'),
(58, 'Djian', 'Philippe'),
(59, 'French', 'Simon'),
(60, 'Perez', 'Rafa'),
(61, 'Joulia', 'Marcelo'),
(62, 'Brown', 'Dan');

-- --------------------------------------------------------

--
-- Structure de la table `authors_books`
--

CREATE TABLE `authors_books` (
  `books_id` int(11) NOT NULL,
  `authors_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `authors_books`
--

INSERT INTO `authors_books` (`books_id`, `authors_id`) VALUES
(1, 29),
(2, 28),
(31, 32),
(35, 12),
(36, 10),
(38, 36),
(39, 18),
(40, 34),
(41, 32),
(42, 40),
(43, 38),
(44, 39),
(45, 41),
(46, 42),
(47, 48),
(48, 47),
(49, 49),
(50, 51),
(51, 52),
(52, 55),
(53, 57),
(54, 59),
(55, 58),
(56, 46),
(57, 60),
(58, 61),
(59, 62),
(60, 32);

-- --------------------------------------------------------

--
-- Structure de la table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(90) NOT NULL,
  `edition` varchar(60) NOT NULL,
  `picture` varchar(90) NOT NULL,
  `alt_picture` varchar(250) NOT NULL,
  `categories_id` int(11) NOT NULL,
  `edit_at` date NOT NULL COMMENT 'Année de publication',
  `format` varchar(20) NOT NULL,
  `condition_books_id` int(11) NOT NULL,
  `summary` text NOT NULL,
  `pages` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `dimensions` varchar(50) NOT NULL,
  `isbn` varchar(13) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` float NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 = vendu / 1 = en vente',
  `tva` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `books`
--

INSERT INTO `books` (`id`, `title`, `edition`, `picture`, `alt_picture`, `categories_id`, `edit_at`, `format`, `condition_books_id`, `summary`, `pages`, `weight`, `dimensions`, `isbn`, `quantity`, `price`, `status`, `tva`) VALUES
(1, 'L\'irremplaçable expérience de l\'explosion de la tête', 'Gallimard', 'b156c10e-6bdc-4107-b08f-59e74cfdaf21_1727706916367.jpg', 'La couverture est sur fond noir avec le titre du livre en rouge. Le reste est écrit en blanc.', 1, '1997-04-01', 'Grand format', 2, 'Cashampton by the Sea, où Jackson Pollock est mort, où Pieter Van Lukens, ami et condisciple de Pollock, vit et peint toujours, est une station balnéaire où se retrouvent les plus grosses fortunes du monde entier.', 336, 334, '13.8 x 2.2 x 20.5', '9782070746507', 1, 9, 1, 0),
(2, 'La nuit du Faune', 'Le livre de poche', '6689a55f-efc5-4aea-9feb-a9c131a4acbe_1727706809948.jpg', 'Nom et Prenom de l auteur écris en blanc. Le titre du livre est écrit en Jaune sur un fond bleu nuit, étoilé', 3, '2023-09-01', 'Poche', 2, 'Au sommet d une montagne vit une petite fille nommée Astrée. Un jour, elle est dérangée par l apparition inopinée d un faune en quête de gloire et de savoir.', 320, 172, '11 x 1.4 x 17.9', '9782253937074', 1, 5, 1, 0),
(31, '1942, le jour se lève ', 'Pocket', '20d2b5b5-9ba8-4725-a230-3799d5e8c520_1727706704998.webp', 'Photo en noir et blanc de Jean Moulin qui porte un chapeau, un manteau et une écharpe. Il est appuyé contre un mur en pierre', 7, '2012-10-01', 'Poche', 3, '1942 : en Europe, en Afrique, en Asie, dans l\'océan Indien, Pacifique ou Arctique, sur tous les théâtres des opérations, combattants et civils tombent par centaines de milliers.\nEn Europe, la puissance nazie applique le plan d\'Hitler : on exécute, déporte, gaze les Juifs. De mondiale, la guerre est devenue totale.', 416, 100, '11 x 1.9 x 17.9 ', '9782266222181', 1, 2, 1, 0),
(35, 'Ceux qui vont mourir te saluent', 'J\'ai lu', 'e9c4668a-a1a1-4d38-bc16-78ef63463445_1727706729271.jpg', 'Sur un ciel violet, une statue de Michel-Ange.', 4, '2004-05-01', 'Poche', 1, 'A priori, tous les dessins de Michel-Ange ont été répertoriés. Et lorsque l\'un d\'eux fait apparition discrète sur le marché, il y a tout lieu de supposer qu\'il a été volé.', 192, 114, '11x17,8x1', '9782290309925', 1, 3, 1, 0),
(36, 'Misérable miranda', 'Pocket', '28754012-5e1c-4893-a98e-386f19984686_1727707404429.webp', 'Une dame brune avec un débardeur regarde un crapaud qu\'elle tien dans sa main droite relevée devant son épaule droite. ', 1, '2005-06-01', 'Poche', 3, 'Elle a beau savoir calmer les névroses d\'un hamster cannibale, égayer la libido d\'un cochon d\'Inde gay, assagir les pulsions d\'un furet kleptomane ou stimuler la psyché d\'un iguane en mal d\'amour, la psy pour animaux Miranda Sweet multiplie les fiascos dès qu\'un homme - à ses yeux, la pire des bêtes sauvages ! - s\'aventure à croiser son chemin. Il est vrai qu\'entre Alexander, bellâtre télévisuel aussi photogénique que dégonflé, et le ministre James Mulholland, amour de jeunesse qui, seize ans plus tôt, lui a fait commettre l\'irréparable, le quotidien de la jolie comportementaliste est plus proche du rodéo que de la partie de plaisir. Jusqu\'au jour où un adorable photo reporter vient chambouler ses a priori et transformer sa vie en safari des cœurs...', 448, 358, '11 x 1.6 x 18', '9782266149907', 1, 2, 1, 0),
(37, 'Croc-Blanc', 'Hachette', '88015465-5b61-4df8-b021-102f2f7beed8_1727708644689.webp', 'Dessin de Cro-Blanc, un chien-loup blanc sur fond bleu. Il a la gueule ouverte, nous voyons ses grands crocs pointus.', 5, '1995-09-01', 'Grand format', 2, 'L\'histoire d\'un chien-loup né à l’état sauvage d\'une mère mi-chienne mi-louve et d\'un père loup, se trouvant confronté au monde des hommes.', 354, 400, '10x20x2', '9782012093096', 1, 3, 1, 0),
(38, 'La Fille du train', 'Sonatine', '4745208f-ff12-487a-830d-145de493a037_1727710642165.jpg', 'Wagon d\'un train dans la nuit. A travers la fenêtre, nous apercevons la silhouette d\'une personne ', 4, '2015-05-01', 'Grand format', 3, 'Depuis la banlieue où elle habite, Rachel prend le train deux fois par jour pour aller et revenir de Londres. Chaque jour elle est assise à la même place et chaque jour elle observe une jolie maison. Cette maison, elle la connaît par cœur, elle a même donné un nom à ses occupants qu\'elle aperçoit derrière la vitre : Jason et Jess. Un couple qu\'elle imagine parfait, heureux, comme Rachel a pu l\'être par le passé avec son mari, avant qu\'il ne la trompe, avant qu\'il ne la quitte. Mais un matin, elle découvre un autre homme que Jason à la fenêtre. Que se passe-t-il ? Jess tromperait-elle son mari ? Quelques jours plus tard, c\'est avec stupeur qu\'elle découvre la photo de Jess à la une des journaux. La jeune femme, de son vrai nom Megan Hipwell, a mystérieusement disparu...', 384, 490, '14x22,1x2,8', '9782355843136', 1, 3, 1, 0),
(39, 'La clinique du docteur H.', 'Albin Michel', '6989451f-19ef-49c1-bba8-7f1427c721fb_1727711858369.webp', 'Couverture noir avec un cadre doré. Le nom de l\'auteur ainsi que le titre son écris en lettres majuscules et sont dorées.', 4, '1993-05-01', 'Grand Format', 2, 'L\'Héroïne de la Clinique du Docteur H est Katie De-Maio, une jeune, séduisante et brillante adjointe au procureur dans une petite ville du New Jersey. Un accident de voiture mineur la conduit à la clinique Westlake où elle aperçoit - ou croit apercevoir -, au milieu de la nuit, une silhouette familière transportant un corps de femme inanimée dans une voiture. Lorsque la femme est retrouvée le lendemain, morte dans son lit, soit-disant victime d\'un suicide, Katie décide de découvrir la vérité et met très vite à jour les scandales et les peurs enfouis dans la vie de personnages en apparence parfaitement équilibrés et respectables.', 336, 447, '15 x 22 x 2,7', '9782724273366', 1, 3, 1, 0),
(40, 'Dans les bois', 'France loisirs', '0a5006fb-d64d-4457-a54e-acfa88e4867c_1727712752404.jpg', 'Photo d\'arbre dans les bois. Il y a en fons de la brume. Les tons de la photos sont bleus.', 4, '2007-08-01', 'Grand Format', 3, 'Paul Copeland a mis vingt ans pour accepter l\'idée que sa soeur, comme trois autres adolescents cette nuit-là, est morte assassinée dans le camp de vacances du lac Charmaine. Même si deux corps seulement ont été retrouvés dans les bois, les chances de revoir Camille vivante se sont évanouies avec le temps. Aujourd\'hui, Paul est à la morgue et c\'est tout son passé qui lui saute à la gorge. Devant ses yeux, un espoir fou.\nLe cadavre d\'un homme. L\'autre adolescent porté disparu...', 562, 600, '10x20x2,8', '9782298004052', 1, 2, 1, 0),
(41, 'Bleu blanc rouge, tome 1 Mariella', 'Pocket', '39c1b296-3117-4ccc-baef-55c32e44a8e5_1727713211123.webp', 'Nous sommes en 1792. Se trouve en premier plan sur la droite une femme. En second plan, à gauche, une troupe de soldats armés.', 2, '2001-08-01', 'Poche', 3, 'C\'est à Paris que commence cette histoire, le 19 septembre 1792.\nPhilippe de Taurignan, ami du roi, attend le jour de son exécution, Maximilien Forestier prend les armes pour sauver la France, suivi de Nicolas Mercoeur qui choisit de se porter volontaire, alors que Guillaume Dussert veut le pouvoir de l\'argent, que Joseph Machecoul, lui, hante les couloirs de la Convention et que la belle Julie de Boissier est prête à tout pour arracher son frère à la guillotine.', 480, 227, '10,9 x 17,5 x 2,3', '9782266101714', 1, 2, 1, 0),
(42, 'Robin des Bois', 'Lito', '8129cbdf-0905-4be9-bcc7-ad5026a78e62_1727713924400.webp', 'Dessin du visage de Robin des Bois. ', 5, '1991-01-01', 'Grand Format', 3, 'La lune, se montrant entre deux épais nuages, permit à Robin de voir le sheriff se dresser devant lui, entouré de ses hommes:\n-Le fantôme de Robin des Bois! cria l\'homme comme l\'épée de Robin lui transperçait le corps...', 130, 200, '12x20x1', '9782244404011', 1, 2, 1, 0),
(43, 'Les Écureuils de Central Park sont tristes le lundi', 'Le Livre de Poche', '776de02f-a41c-4cc8-a2cf-474464301e04_1727715059694.jpg', 'Dessin d\'écureuils de toutes les couleurs sur un fond jaune.', 2, '2011-06-01', 'Poche', 3, 'Souvent la vie s’amuse.\nElle nous offre un diamant, caché sous un ticket de métro ou le tombé d’un rideau. Embusqué dans un mot, un regard, un sourire un peu nigaud.\nIl faut faire attention aux détails. Ils sèment notre vie de petits cailloux et nous guident. Les gens brutaux, les gens pressés, ceux qui portent des gants de boxe ou font gicler le gravier, ignorent les détails. Ils veulent du lourd, de l’imposant, du clinquant, ils ne veulent pas perdre une minute à se baisser pour un sou, une paille, la main d’un homme tremblant.\nMais si on se penche, si on arrête le temps, on découvre des diamants dans une main tendue… Et la vie n’est plus jamais triste. Ni le samedi, ni le dimanche, ni le lundi…\n', 960, 485, '11,0 x 18,0 x 3,7', '9782253161950', 1, 2, 1, 0),
(44, 'La gloire des vaincus', 'J\'ai Lu', '51674e49-c72f-4de0-9dda-7e6b289bc462_1727882530888.jpg', 'Illustration de Paul Durand représentant une femme en premier plan et des hommes en second plan. Entre les deux, un homme au sol, face contre terre.', 2, '1975-01-01', 'Poche', 3, 'A Saint-Pétersbourg, en décembre 1825, Nicolas Ozareff tente avec ses amis, groupe d\'aristocrates et de militaires généreux, de renverser le régime aristocratique pour imposer une constitution libérale. Rassemblés sur la place du Sénat, les \"décembristes\" sont décimés par les canons du futur tsar Nicolas Ier. Les survivants, jetés dans les cachots de la forteresse Saint-Pierre et Saint-Paul, seront pendus ou déportés en Sibérie.', 384, 300, '11,4 x 16,6 x 1,1', '9782277132769', 1, 1, 1, 0),
(45, 'Le livre rénovateur des nerveux et des surmenés', 'Dangles', 'ee3a9097-7b10-45c9-a321-d33b89481c65_1727786556400.jpg', 'Couverture verte. Un dessin noir et jaune représentant une personne de profil ouvrant son bras droit devant le soleil.', 12, '1986-07-01', 'Poche', 3, 'Le livre rénovateur des nerveux et des surmenés guide pratique pour surmonter les stress et toute défaillance nerveuse ou cérébrale par Paul-c. Jagot.', 150, 200, '13,5x18x1,1', '9782703300823', 1, 10, 1, 0),
(46, 'Guide pratique de l\'Acupuncture à l\'Acupressing', 'Marabout', '38659858-f909-4035-a1b4-caec52e72fce_1727787505539.webp', 'Une main le poing fermé. Le pousse appuie sur le corps d\'une personne. ', 12, '1980-01-01', 'Poche', 3, 'Les doigts qui guérissent ? Un rêve qui peut se réaliser pour de nombreuses affections. Le docteur Grigorieff vous explique comment déterminer les points chinois pour:\n- 55 maladies, d\'acné à vertiges\n-les défaillances sexuelles\n-les maladies courantes de votre chien.', 256, 200, '11,5x18x1,6', '00B003D2FY6C0', 1, 5, 1, 0),
(47, 'Le fantôme venu des profondeurs', 'J\'ai lu', '0c324ebd-a9dc-4199-95fe-b95a26c6fce8_1728901337289.jpg', 'Un homme dans une capsule sous-marine dans le fond des océans se trouve face à un poulpe rouge géant.', 3, '1993-07-01', 'Poche', 2, 'Nous sommes en 2010. Dans deux ans, c\'est le centenaire d\'une catastrophe qui a bouleversé le monde et a hanté les esprits : le naufrage du Titanic.\n     La carcasse de ce géant, ce paquebot de luxe que l\'on croyait insubmersible, gît par quatre mille mètres de fond, dans les eaux glacées de l\'Atlantique Nord. Combien de morts sont restés piégés dans cet immense cercueil de métal ?', 320, 200, '1.1 x 0.15 x 1.65', '9782277235118', 1, 3, 1, 0),
(48, 'Charlie et le grand ascenseur de verre', 'Folio junior', '4b7aa613-8f46-4c5e-84d6-38baedb425be_1728908631465.webp', 'Charlie et toute sa famille dans un grand ascenseur de verre qui regardent le planète Terre.', 5, '1978-11-01', 'Poche', 3, 'Suite de Charlie et la chocolaterie.\nCharlie Bucket a hérité de la fabuleuse chocolaterie de Mr. Willy Wonka , qu\'il survole à présent, avec toute sa famille, à bord d\'un moyen de locomotion hors du commun: un grand ascenseur de verre. Car l\'appareil est monté trop haut; si haut qu\'il navigue maintenant à travers l\'espace. Un espace qu\'ils découvrent peuplé d\'êtres fantastiques.', 160, 117, '1,1 x 1,8 x 0,1', '9782070330652', 1, 4, 1, 0),
(49, 'L\'enfant de mon mari', 'Pocket', 'f30da369-8a35-4fff-aa44-d0b774ecb3d2_1729096054460.jpg', 'Photo en noir et blanc d\'un enfant devant une fenêtre', 4, '2019-01-01', 'Poche', 2, 'Heidi et Jason ne forment pas un couple ordinaire : elle a perdu sa petite fille ; il cherche désespérément son fils, enlevé cinq ans plus tôt. Ces drames les ont rapprochés. Un jour, Heidi aperçoit dans une arrière-boutique un garçon qui pourrait bien être le fils de Jason. Alors que Jason refuse de croire à ce don du hasard, Heidi n\'en démord pas. L\'intuition vire à l\'obsession, et la jeune femme se plonge dans une enquête qui fragilise son couple. Jason lui cache-t-il quelque chose ? Heidi est-elle devenue paranoïaque ? À qui peut-elle se fier ?', 382, 203, '10,8x17,7x1,8', '9782266290791', 1, 5, 1, 0),
(50, 'Intime Pulsion', 'Pocket', '73d8354e-1165-4a65-adad-9858258faca0_1729156883616.jpg', 'Un chien de profil fabriqué. Il a des boulons aux articulations et du fil pour assembler sa tête et sa queue.', 4, '2004-03-01', 'Poche', 3, 'Acid Row. Une cité dépotoir en Angleterre. Une banlieue où le meilleur côtoie le pire. Où il suffit d\'un rien pour déclencher les événements les plus fous, y compris l\'horreur. Et un matin la rumeur naît, court, s\'enflamme : Amy, une fillette de onze ans, a disparu. L\'émeute se déclenche, nourrie par la chaleur, les rancœurs et les frustrations. Tandis que la police, débordée sur le terrain, s\'efforce en vain de contenir la foule déchaînée, les enquêteurs, dans une infernale course contre la montre, tentent de retrouver la jeune Amy. ', 512, 260, '10,8x17,8x2,5', '9782266132954', 1, 4, 1, 0),
(51, '1979', 'Pocket', '9ec978a3-18d1-4437-a2ea-4211a6b7e7fe_1729157394254.jpg', '1979 écris en rouge sur un mur ', 2, '0200-08-01', 'Poche', 2, '1979.\nQuatre chiffres peints en rouge sur un mur décrépi. Et tant de combinaisons envisageables. Est-ce une date clé ? Un code confidentiel ? Une mauvaise blague ? Une menace camouflée ? Une invitation au voyage ? Ou encore un signe du destin ? Rien de tout cela. Et un peu tout à la fois.\nAux yeux, entre autres, de Virginie, Arnaud, Julien, Hervé, Paul, Elizabeth ou Annie. Respectivement maman rêveuse, jeune garçon perturbé, taggueur rageur, médecin au bout du rouleau, assassin repenti, chagrin d\'amour ambulant et propriétaire très en colère.\nEt tous plus ou moins bouleversés par cette étrange date surgie de nulle part puis qui disparaît un beau jour, emportant avec elle un bien drôle de secret...', 192, 115, '10,8x17,8x1,4', '9782266144377', 1, 2, 1, 0),
(52, 'La Légende de Drizzt, Tome1 : Terre natale', 'Bragelonne', '7d8a9621-a5ab-45b6-9082-144998d7f996_1729163828379.jpg', 'Dans un décor fantastique, une panthère noire et un homme avec une épée à la main droite et sa main gauche sur le dos de la panthère marchent.', 9, '2009-05-01', 'Poche', 3, 'Drizzt est un elfe noir né en Outreterre où le pouvoir s\'obtient par la guerre ou le meurtre, L\'honneur, l\'amitié, l\'amour n\'y ont pas leur place et Drizzt y fait le rude apprentissage d\'une vie de servitude. Bien qu\'il ait été élevé dans un système de valeurs totalement perverti et qu\'il soit rompu à l\'art du combat, il sait qu\'il n\'est pas comme les autres. Il aspire à une vie différente et refuse de devenir un assassin au service des siens. Mais pour survivre, Drizzt est obligé de dissimuler et même nier sa véritable nature. Jusqu\'au jour où il devra se battre seul contre tous !', 448, 224, '11x17,8x2.6', '9782811201388', 1, 3, 1, 0),
(53, 'Une sourie verte', 'Milan', '3d145a87-2d75-4936-9dec-6d304e9c0412_1729352521233.jpg', 'Une souris verte marche dans l\'herbe. Sa queue et son nez sont roses.', 5, '2006-01-01', 'Grand', 14, 'Dans la ligne de Si le loup y était, cette nouvelle adaptation d\'une comptine célèbre joue le jeu de l\'interactivité : matières à toucher, pages découpées, pop-up final...', 12, 380, '20,8x20,8x1,5', '9782745921437', 1, 4, 1, 0),
(54, 'Un endroit ou grandir', 'Nathan', 'e466b4f8-5280-4f89-8bf3-544cc337fe99_1729517813834.jpg', 'Le visage incliné d\'un garçon sur son épaule gauche. Une contrebasse derrière lui.', 5, '2006-06-01', 'Poche', 2, 'Ari est un garçon ordinaire avec un talent extraordinaire pour la musique. Depuis que sa mère et lui se sont installé en Australie, Ari se sent seul et perdu. Mais chaque fois qu\'il joue du violon, la musique fait resurgir des souvenirs enfouis qui le réconfortent. Jusqu\'au jour où brutalement, Ari décide de tout arrêter. Et si pourtant la musique était la clé de sa nouvelle vie.', 256, 186, '12x18,1x1,7', '9782092512302', 1, 6, 1, 0),
(55, 'Sotos', 'Gallimard', '903d637b-c8fd-46bd-8c0c-8321ce4cc3f7_1729517633142.jpg', 'Dessin représentant un toréador à cheval plantant un taureau.ure', 2, '1995-03-01', 'Poche', 3, 'Sous la lumière brutale d\'un immense Sud hispanique, trois hommes font brutalement l\'apprentissage de la vie : Mani, fils sans père, dans toute la fougue de ses dix-huit ans, cherche une direction, un chemin ; Vito, père sans fils, confronté à la quarantaine, cherche à revenir dans les pas qu\'il s\'est tracés ; Victor Sarramanga, vieux solitaire farouche qui règne sur l\'espace et les gens, cherche à régler ses ultimes comptes. Le premier va subir les premières piques, le second recevoir les banderilles, le dernier rencontrer...', 496, 258, '11x17,70x2,40', '9782070393039', 1, 4, 1, 0),
(56, 'La Petite Roque', 'Gallimard', 'ce109c8e-bc2d-4abb-a1c8-42204f39da3a_1729355025346.webp', 'Peinture d\'une dame allongée sur un lit, sur le ventre, la jupe relevée', 2, '1987-04-01', 'Poche', 3, 'La Petite Roque : une fillette violée et étranglée dont le facteur d\'un village comme les autres découvre le cadavre lors de sa promenade matinale. \" Quel gredin a bien pu faire un pareil coup dans ce pays-ci ? - Qui sait ? Tout le monde est capable de ça. Tout le monde en particulier et personne en général \". La folie chez Maupassant frappe où elle veut, quand elle veut. C\'est elle qui précipite l\'affreux Renardet (le maire de la commune) sur sa petite victime. Qui pousse une malheureuse servante à l\'infanticide (Rosalie Prudent). Un vieux paysan à la pendaison lorsqu\'il se sent dépossédé de son bien par le remariage de sa bru (Le Père Amable). Et, quand nous ne sommes pas fous, c\'est la vie qui se charge de l\'être pour nous : ainsi le héros de L\'Ermite découvrira, en regardant une photo sur une cheminée, que la gentille serveuse avec laquelle il vient de passer la nuit est sa fille.', 224, 140, '11×17,8×1,5', '9782070378098', 1, 3, 1, 0),
(57, 'Costa Blanca', 'Triangle Postals', '3007b213-a58a-43f0-ab1c-0b89eaacbaf2_1729518650336.jpg', 'Photo d\'une ville de la Costa Blanca.', 24, '2010-01-01', 'Grand Format', 2, 'Les plus de 218 km de littoral et le nombre remarquable de jours ensoleillés par an sont la carte de visite d\'une marque, Costa Blanca, qui englobe toutes les régions d\'Alicante. Une côte très variée de plages et criques, un intérieur avec des sommets spectaculaires qui font de la zone l\'une des plus montagneuses du pays, et une multitude de jardins parfumés forment un paysage qui est l\'essence pure de la Méditerranée.', 240, 481, '15,7x16,1x1,8', '9788484784388', 1, 12, 1, 0),
(58, 'Argentina: Cuisine authentique et recettes de chefs', 'Hachette', 'cca7189a-a3cd-4511-9ec8-2a5c6abfb839_1729519255155.jpg', 'Sur un fond doré, une bande bleue sur laquelle est écris le titre en noir. Sous celui-ci se trouve le soleil avec un visage du drapeau argentin.', 8, '2015-02-01', 'Grand Format', 2, 'Marcelo Joulia, le patron du célèbre restaurant argentin \"Unico\" à Paris, présente ici ses recettes authentiques. De l\'asado, célèbre barbecue qui fait l\'identité culinaire du pays, aux empanadas, matambre ou cochon de lait Relleno, pour finir en douceur avec des desserts à base de dulce de leche comme les alfajores, voyagez au coeur de l\'Argentine.', 144, 1132, '21x29,7x2,2', '9782012388239', 1, 50, 1, 0),
(59, 'Da Vinci Code', 'JC Lattès', 'ef276ffb-cc51-4bed-a9eb-8f9b9c64a363_1729519938656.jpg', 'Les yeux de la Joconde au centre. Le titre sur fond rouge en bas et le nom de l\'auteur en haut.', 1, '2004-09-01', 'Grand Format', 14, 'De passage à Paris, Robert Langdon, professeur à Havard et spécialiste de symbologie, est appelé d\'urgence au Louvre, en pleine nuit. Jacques Saunière, le conservateur en chef a été retrouvé assassiné au milieu de la Grande Galerie. Au côté du cadavre, la police a trouvé un message codé. Langdon et Sophie Neveu, une brillante cryptographe membre de la police, tentent de le résoudre. Ils sont stupéfaits lorsque les premiers indices le conduisent à l\'oeuvre de Léonard de Vinci. Ils découvrent également que Saunière était membre du Prieuré de Sion, une société secrète dont avaient fait partie Nexton, Boticelli, Léonardo da Vinci, Victor Hugo, et qu\'il protégeait un secret millénaire. L\'enquête de nos deux héros les entraînera à travers la France et le Royaume-Uni, non seulement pour chercher une vérité longtemps cachée concernant la Chrétienté, mais également pour échapper à ceux qui voudraient s\'emparer du secret. Pour réussir, il leur faut résoudre de nombreuses énigmes, et vite, sinon le secret risque d\'être perdu à tout jamais.', 574, 673, '15x23x4,2', '9782709624930', 1, 9, 1, 0),
(60, 'L\'empire - 1 - l\'envoutement', 'J\'ai lu', '1feebf70-36cd-4005-9cdf-51a81d9cbeef_1729520571274.jpg', 'Peinture représentant un homme noir devant un fleuve. Dans gens dans un barque. Sur l\'autre rive, un village. ', 2, '2005-12-01', 'Poche', 3, '«Ceux qui me liront découvriront ainsi que la plus grande partie de ma vie a été une forme de la mort [...]» 1870. Après la déroute de Sedan et l\'épisode douloureux de la Commune, Charles Faurel décide de partir servir son pays en Algérie. Là-bas, en Afrique, et jusqu\'à Saïgon, Charles se bat pour faire plier ces indigènes qu\'il pense inférieurs aux Blancs. Peu à peu, aux côtés de Savorgnan de Brazza et de prêtres missionnaires, Charles découvre une Afrique envoûtante.', 384, 201, '11x17,8x2,1', '9782290345191', 1, 3, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Littérature étrangère'),
(2, 'Littérature française'),
(3, 'Science-Fiction'),
(4, 'Romans Policiers'),
(5, 'Jeunesse'),
(6, 'BD - Mangas'),
(7, 'Histoire'),
(8, 'Cuisine'),
(9, 'Fantasy'),
(10, 'Sciences humaines'),
(11, 'Beaux-arts'),
(12, 'Sante - Bien-être'),
(13, 'Jardinage - Bricolage'),
(24, 'Tourisme');

-- --------------------------------------------------------

--
-- Structure de la table `condition_books`
--

CREATE TABLE `condition_books` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `condition_books`
--

INSERT INTO `condition_books` (`id`, `name`) VALUES
(1, 'Comme neuf'),
(2, 'Très bon'),
(3, 'Bon'),
(14, 'Correct');

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `email` varchar(90) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `story` longtext NOT NULL,
  `receipt_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0= non lu / 1= lu'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `contacts`
--

INSERT INTO `contacts` (`id`, `email`, `subject`, `story`, `receipt_date`, `status`) VALUES
(2, 'mapa@hotmail.com', 'Artisans voulant exposer', 'Bonjour, nous souhaiterions vous présenter le travail de différents artisants afin qu ils puissent être exposés dans votre Bouquinerie', '2024-08-26 12:44:32', 1),
(10, 'blan@gmail.com', 'Livres anciens', 'Bonjour,\nAvez-vous des livres anciens ?\nCordialement,\nB.C', '2024-10-14 11:11:16', 1);

-- --------------------------------------------------------

--
-- Structure de la table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `orders_id` int(11) NOT NULL,
  `books_id` int(11) NOT NULL,
  `weight` int(11) NOT NULL COMMENT 'Exprimé en gramme',
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL,
  `tva` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `orders_id`, `books_id`, `weight`, `quantity`, `price`, `tva`) VALUES
(14, 20, 2, 172, 1, 5, 0),
(15, 20, 1, 334, 1, 9, 0),
(29, 25, 2, 172, 1, 5, 0),
(30, 25, 1, 334, 1, 9, 0),
(35, 27, 2, 172, 1, 5, 0),
(36, 27, 1, 334, 1, 9, 0),
(38, 28, 35, 114, 1, 3, 0),
(39, 28, 2, 172, 1, 5, 0),
(40, 29, 35, 114, 1, 3, 0),
(41, 29, 2, 172, 1, 5, 0),
(42, 29, 1, 334, 1, 9, 0),
(43, 30, 35, 114, 1, 3, 0),
(44, 30, 31, 525, 1, 3, 0),
(45, 31, 44, 300, 1, 1, 0),
(46, 31, 42, 200, 1, 2, 0),
(47, 31, 40, 600, 1, 2, 0),
(48, 31, 39, 447, 1, 3, 0),
(49, 31, 38, 490, 1, 3, 0),
(56, 35, 43, 485, 1, 2, 0),
(57, 35, 45, 200, 1, 10, 0),
(60, 37, 43, 485, 1, 2, 0),
(61, 37, 45, 200, 1, 10, 0),
(66, 40, 43, 485, 1, 2, 0),
(67, 40, 31, 100, 1, 2, 0),
(89, 48, 36, 358, 1, 2, 0),
(90, 48, 1, 334, 1, 9, 0),
(91, 48, 46, 200, 1, 5, 0),
(92, 49, 46, 200, 1, 5, 0),
(93, 49, 45, 200, 1, 10, 0),
(94, 49, 43, 485, 1, 2, 0),
(95, 50, 43, 485, 1, 2, 0),
(96, 50, 42, 200, 1, 2, 0),
(97, 50, 41, 227, 1, 2, 0),
(98, 50, 40, 600, 1, 2, 0),
(99, 51, 46, 200, 1, 5, 0),
(100, 51, 43, 485, 1, 2, 0),
(101, 52, 45, 200, 1, 10, 0),
(102, 52, 44, 300, 1, 1, 0),
(103, 52, 43, 485, 1, 2, 0),
(104, 52, 46, 200, 1, 5, 0),
(105, 53, 46, 200, 1, 5, 0),
(106, 53, 45, 200, 1, 10, 0),
(107, 53, 44, 300, 1, 1, 0),
(108, 53, 43, 485, 1, 2, 0),
(114, 55, 44, 300, 1, 1, 0),
(115, 55, 45, 200, 1, 10, 0),
(116, 55, 2, 172, 1, 5, 0),
(120, 57, 48, 117, 1, 4, 0),
(121, 57, 47, 200, 1, 3, 0),
(122, 57, 1, 334, 1, 9, 0),
(139, 63, 45, 200, 1, 10, 0),
(140, 63, 46, 200, 1, 5, 0),
(141, 64, 45, 200, 1, 10, 0),
(142, 64, 46, 200, 1, 5, 0),
(143, 65, 48, 117, 1, 4, 0),
(144, 65, 47, 200, 1, 3, 0),
(145, 65, 44, 300, 1, 1, 0),
(146, 66, 47, 200, 1, 3, 0),
(147, 66, 48, 117, 1, 4, 0),
(148, 67, 43, 485, 1, 2, 0),
(149, 67, 41, 227, 1, 2, 0),
(150, 68, 43, 485, 1, 2, 0),
(151, 68, 41, 227, 1, 2, 0),
(152, 69, 42, 200, 1, 2, 0),
(153, 69, 40, 600, 1, 2, 0),
(156, 72, 2, 172, 1, 5, 0),
(157, 73, 49, 203, 1, 5, 0),
(158, 73, 40, 600, 1, 2, 0),
(159, 74, 52, 224, 1, 3, 0),
(160, 74, 51, 115, 1, 2, 0),
(161, 75, 39, 447, 1, 3, 0),
(162, 75, 48, 117, 1, 4, 0),
(170, 78, 50, 260, 1, 4, 0),
(171, 78, 51, 115, 1, 2, 0);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_books` int(11) NOT NULL,
  `total_amount_books` float NOT NULL,
  `total_weight` int(11) NOT NULL COMMENT 'Exprimé en grammes',
  `costs` float NOT NULL,
  `total_amount` float NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'non payée' COMMENT 'Statuts possibles: payée/en préparation/ expédiée/ réservée/ terminée/ annulée',
  `users_id` int(11) DEFAULT NULL,
  `total_tva` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `date`, `total_books`, `total_amount_books`, `total_weight`, `costs`, `total_amount`, `status`, `users_id`, `total_tva`) VALUES
(20, '2024-08-25 07:51:38', 3, 18, 1506, 10.15, 28.15, 'terminée', NULL, 0),
(25, '2024-08-26 10:01:01', 3, 22, 1506, 10.15, 32.15, 'terminée', NULL, 0),
(27, '2024-08-26 12:07:04', 3, 22, 1506, 10.15, 32.15, 'terminée', NULL, 0),
(28, '2024-09-26 13:19:00', 2, 8, 286, 6.99, 14.99, 'terminée', NULL, 0),
(29, '2024-09-26 13:22:12', 3, 17, 620, 8.1, 25.1, 'terminée', NULL, 0),
(30, '2024-09-27 13:59:05', 2, 6, 639, 8.1, 14.1, 'terminée', 34, 0),
(31, '2024-10-01 10:32:55', 5, 11, 2037, 15.6, 26.6, 'terminée', NULL, 0),
(35, '2024-10-01 13:39:20', 2, 12, 685, 8.1, 20.1, 'terminée', NULL, 0),
(37, '2024-10-01 13:53:43', 2, 12, 685, 8.1, 20.1, 'terminée', NULL, 0),
(40, '2024-10-01 14:09:26', 2, 4, 585, 8.1, 12.1, 'terminée', NULL, 0),
(48, '2024-10-02 15:31:52', 3, 16, 892, 8.8, 24.8, 'terminée', 1, 0),
(49, '2024-10-05 09:11:40', 3, 17, 885, 8.8, 25.8, 'terminée', 36, 0),
(50, '2024-10-05 15:28:28', 4, 8, 1512, 10.15, 18.15, 'terminée', 36, 0),
(51, '2024-10-06 13:39:32', 2, 7, 685, 8.1, 15.1, 'terminée', 1, 0),
(52, '2024-10-09 14:39:56', 4, 18, 1185, 10.15, 28.15, 'terminée', 1, 0),
(53, '2024-10-10 10:08:39', 4, 18, 1185, 10.15, 28.15, 'terminée', 1, 0),
(55, '2024-10-14 12:39:04', 3, 16, 672, 8.1, 24.1, 'terminée', 36, 0),
(57, '2024-10-14 14:46:04', 3, 16, 651, 8.1, 24.1, 'terminée', 32, 0),
(63, '2024-10-14 16:13:59', 2, 15, 400, 6.99, 21.99, 'terminée', 1, 0),
(64, '2024-10-14 16:24:40', 2, 15, 400, 6.99, 21.99, 'terminée', 1, 0),
(65, '2024-10-15 08:39:50', 3, 8, 617, 8.1, 16.1, 'terminée', 1, 0),
(66, '2024-10-15 08:51:53', 2, 7, 317, 6.99, 13.99, 'terminée', 1, 0),
(67, '2024-10-15 09:11:46', 2, 4, 712, 8.1, 12.1, 'terminée', 36, 0),
(68, '2024-10-15 09:18:53', 2, 4, 712, 8.1, 12.1, 'terminée', 36, 0),
(69, '2024-10-15 09:50:59', 2, 4, 800, 8.8, 12.8, 'terminée', 34, 0),
(72, '2024-10-17 15:25:43', 1, 5, 172, 4.99, 9.99, 'terminée', 37, 0),
(73, '2024-10-17 15:27:10', 2, 7, 803, 8.8, 15.8, 'terminée', 32, 0),
(74, '2024-10-18 14:33:46', 2, 5, 339, 6.99, 11.99, 'envoyée', 1, 0),
(75, '2024-10-18 15:03:07', 2, 7, 564, 8.1, 15.1, 'en préparation', 36, 0),
(78, '2024-10-21 10:51:16', 2, 6, 375, 6.99, 12.99, 'payée', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `email` varchar(90) NOT NULL,
  `password` char(60) NOT NULL,
  `address` varchar(100) NOT NULL,
  `complement_address` varchar(60) DEFAULT NULL,
  `zip` varchar(5) NOT NULL,
  `city` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `status` varchar(5) NOT NULL DEFAULT 'user' COMMENT 'status possibles: user/admin ',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `lastname`, `firstname`, `email`, `password`, `address`, `complement_address`, `zip`, `city`, `phone`, `status`, `created_at`) VALUES
(1, 'Curt', 'Catherine', 'cathycurt@hotmail.com', '$2a$10$WIi5Dfo.0PPZMT7HRDKI0.vdSt7rKsEfCqjvy/dLAkWRnevO9KCre', '19 rue Saint Pantaléon', '', '24290', 'Sergeac', '0782746474', 'admin', '2024-08-13 12:48:36'),
(29, 'Blanc', 'Emilie', 'blanc@gmail.com', '$2a$10$.V85iSk9Ii17thgTlsEddupMBZ3dZgyO8PqVU72V7QkpXUUgbBlKa', '12 rue de la place', '', '33000', 'Bordeaux', '0708090405', 'user', '2024-09-26 15:36:58'),
(30, 'Laudea', 'Vincent', 'laudea@gmail.com', '$2a$10$vKCj.l.jEet84LU/MiOwwOfNM6LZ2CB9DIM6mi6Y3VmnzJVnPV8Z2', '3 chemin de Roucheou', '', '40140', 'Soustons', '0605040302', 'user', '2024-09-26 15:38:52'),
(31, 'Carayol', 'Julia', 'carayol@hotmail.com', '$2a$10$6Zr8JjAqseKvhpPGRhkzH.0AFCeNOBywVcV8hRwDd0I3s6HWKYzBu', '3 chemin de Roucheou', '', '40140', 'Soustons', '0708090405', 'user', '2024-09-26 15:40:12'),
(32, 'Coudret', 'Laurie', 'coudret.laurie5@gmail.com', '$2a$10$ioUVKhOZEpvvkE1TnEXI2eGLCehlLEg46cmCsVAu.l2MFN9Z/oLPe', '', '', '', '', '', 'user', '2024-09-26 15:41:32'),
(34, 'Leblanc', 'Lydia', 'leblanc@hotmail.com', '$2a$10$uD8AN1xCgHniWYKsikueYeVWWtDwJ6NotxtHEABccZNUardJLdELK', '16 route de la Fleur', '', '33114', 'La Barp', '0708090605', 'user', '2024-09-27 07:56:04'),
(36, 'Paez', 'Cécilia', 'ceciliapaez5@hotmail.com', '$2a$10$AIfV7JJDl1SmeEAq72i0lu/p2HdjpDPp0Ujqeh7wI0iSzvaGH/DT.', '19 rue Saint Pantaléon', '', '24290', 'Sergeac', '0102030405', 'user', '2024-10-04 16:16:48'),
(37, 'Cahu', 'Quentin', 'bobo@gmail.com', '$2a$10$4RsKd.0HfGMAtaWIkCy1DeNkqIcBRW8.nqSD5xFmoFDtcSv4FnPUi', 'rue du chêne', 'sous le saule', '36000', 'Clermont Ferrand', '0102030405', 'user', '2024-10-17 15:18:49'),
(38, 'pierre', 'present', 'cailloux@gmail.com', '$2a$10$sD1LlpA5Vsw75gg01yL6POvIuBoDlJtsCUaUKZ1Q/D0eW1bWip9fW', '2 rue des rochers', '', '34200', 'ferrero', '0605154585', 'user', '2024-10-17 15:20:03'),
(39, 'Robert', 'Ines', 'robert@gmail.com', '$2a$10$j/zEhdqdCUAJIxDscwk8H.UneSk0BJtBfU69KP1OkFLWZ7lr.pTvG', '12 rue de la place', 'principale', '44000', 'Nantes', '0701020304', 'user', '2024-10-18 11:55:25');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `authors_books`
--
ALTER TABLE `authors_books`
  ADD KEY `books_id` (`books_id`,`authors_id`),
  ADD KEY `authors_books_ibfk_2` (`authors_id`);

--
-- Index pour la table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`categories_id`,`condition_books_id`),
  ADD KEY `books_ibfk_1` (`condition_books_id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `condition_books`
--
ALTER TABLE `condition_books`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `books_id` (`books_id`,`orders_id`),
  ADD KEY `orderdetails_ibfk_1` (`orders_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT pour la table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `condition_books`
--
ALTER TABLE `condition_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `authors_books`
--
ALTER TABLE `authors_books`
  ADD CONSTRAINT `	books_id` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `authors_books_ibfk_2` FOREIGN KEY (`authors_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`condition_books_id`) REFERENCES `condition_books` (`id`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`);

--
-- Contraintes pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
