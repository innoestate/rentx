Les actions sont une façade utilisant ngrx dont l'objectif est de fournir les informations nécessaires
aux composants pour l'affichage.

Il peut y avoir: 
- un mapping des composants à afficher:
Par exemple getDisplayedElements() => [['navigation'], ['prospections-table'], ['actions']]
Ce mapping permettra d'avoir l'affichage dans cet ordre.
(Il en sera de la responsabilité du Composant d'affichage de bien trier les composants déjà afficher et les nouveaux)

et aussi:
- des actions pour spécifier a des composants afficher certains comportements
Par exemple pour le composant Navigation, getNavigation() => 'prospections'
Cela permettra au composant Navigation de mettre en lumière le bouton "prospections" et d'activer 
le bouton "sellers" qui déclenchera l'action navigate('sellers')
(cette action navigate déclenchera a son tour l'updateDisplay qui dans notre exemple deviendrait: 
[['navigation'], ['sellers-table'], ['actions']]

Si on revient sur notre [['navigation'], ['prospections-table'], ['actions']] et qu'on imagine que l'utilisateur clique
sur une ligne, alors l'action showDescription(id) sera déclenchée.
il y aura ensuite par exemple une emission de updateDisplay avec:
[['navigation'], ['prospections-table'], ['actions', 'prospections-description']]
cela indiquera au composant d'affichage qu'il faut ajouter le coposant ProspectionDescription en dessous du composant Actions!


Le composant ProspectionDescription lui même ferait appel à la façade pour obtenir les informations à afficher, 
par exemple: getSelectedDescription() 