class RefSelectDropdown {
  constructor($dropdownButton, availableRefs) {
    $dropdownButton.glDropdown({
      data: availableRefs,
      filterable: true,
      filterByText: true,
      remote: false,
      fieldName: $dropdownButton.data('field-name'),
      filterInput: 'input[type="search"]',
      selectable: true,
      isSelectable(branch, $el) {
        return !$el.hasClass('is-active');
      },
      text(branch) {
        return branch;
      },
      id(branch) {
        return branch;
      },
      toggleLabel(branch) {
        return branch;
      },
    });

    const $dropdownContainer = $dropdownButton.closest('.dropdown');
    const $fieldInput = $(`input[name="${$dropdownButton.data('field-name')}"]`, $dropdownContainer);
    const $filterInput = $('input[type="search"]', $dropdownContainer);

    $filterInput.on('keyup', (e) => {
      const keyCode = e.keyCode || e.which;
      if (keyCode !== 13) return;

      const ref = $filterInput.val().trim();
      if (ref === '') {
        return;
      }

      $fieldInput.val(ref);
      $('.dropdown-toggle-text', $dropdownButton).text(ref);

      $dropdownContainer.removeClass('open');
    });
  }
}

export default RefSelectDropdown;
