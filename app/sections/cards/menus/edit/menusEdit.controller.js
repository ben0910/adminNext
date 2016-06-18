angular
  .module('adminNext.menus')
  .controller('MenusEditController', MenusEditController);


MenusEditController.$inject = ['$scope', '$brExpansionCardManager', 'organizationsService', 'watchForEdit', 'menusId', 'parentId', 'parentType', '$timeout'];
function MenusEditController($scope, $brExpansionCardManager, organizationsService, watchForEdit, menusId, parentId, parentType, $timeout) {
  var vm = this;

  organizationsService.registerScope($scope, [vm]);
  organizationsService.bind(vm, 'menu', 'menus', menusId);
  if (parentId !== undefined) {
    vm.ownerType = parentType;
    organizationsService.bind(vm, 'owner', parentType, parentId);
  }
  organizationsService.get();


  function checkChanges() {
    vm.edited = false;
    watchForEdit.watch(vm, 'menu', $scope, function () {
      vm.edited = true;
    });
  }
  checkChanges();


  vm.types = [
    'full',
    'game',
    'preorder',
    'Merchandise'
  ];
  vm.save = save;
  vm.cancel = cancel;
  vm.createMenuItem = createMenuItem;
  vm.editMenuItem = editMenuItem;
  vm.createCategory = createCategory;
  vm.editCategory = editCategory;
  vm.categoriesOpen = true;


  function save() {
    organizationsService.applyChanges();
    if ($scope.$card.topCard === false) {
      $scope.$card.remove();
    } else { checkChanges(); }
  }

  function cancel() {
    organizationsService.removeChanges();
    if ($scope.$card.topCard === false) {
      $scope.$card.remove();
    } else { checkChanges(); }
  }


  function createMenuItem(id) {
    $brExpansionCardManager('cardManager').add('menuItemsCreate', {categoriesId: id});
  }

  function editMenuItem(categoriesId, menusItemId) {
    $brExpansionCardManager('cardManager').add('menuItemsEdit', {categoriesId: categoriesId, menuItemsId: menusItemId});
  }

  function createCategory() {
    $brExpansionCardManager('cardManager').add('categoriesCreate', {menusId: menusId});
  }

  function editCategory(id) {
    $brExpansionCardManager('cardManager').add('categoriesEdit', {menusId: menusId, categoriesId: id});
  }
}
