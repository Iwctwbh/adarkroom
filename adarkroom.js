var flag = true;
var auto = () => {
  // 自动track
  // if ($('#track')) {
  //     $('#track').trigger('click');
  //     $('#end').trigger('click');
  // }
  // 自动收集
  $('#gatherButton').trigger('click');
  $('#trapsButton').trigger('click');

  // 自动攻击
  $('#attack_bone-spear').trigger('click');
  $('#attack_iron-sword').trigger('click');

  // 自动建造
  if ($('#buildBtns > div').not('#build_trap').length > 0) {
    $('#buildBtns > div').not('.disabled').not('#build_trap').trigger('click');
  } else {
    $('#build_trap').not('.disabled').trigger('click');
  }
  $('#build_waterskin').not('.disabled').trigger('click');
  $('#build_rucksack').not('.disabled').trigger('click');
  $('#build_l-armour').not('.disabled').trigger('click');

  // 自动调整工作
  // workers_row_gatherer 伐木者 木头 +1
  // workers_row_charcutier 熏肉师 肉 -5 木头 -5 熏肉 +1
  // workers_row_hunter 猎人 毛皮 +0.5 肉 +0.5
  // workers_row_tanner 皮革师 毛皮 -5 皮革 +1
  // workers_row_trapper 陷阱师 肉 -1 诱饵 + 1
  // 猎人 > (陷阱师 + 5 * 熏肉师) * 2
  // 猎人 > 10 * 皮革师
  // 伐木者 > 5 * 熏肉师
  // 在所有工作都能进行时 伐木者5 猎人12 陷阱师1 皮革师1 熏肉师1

  if (
    $('#population').text().substring(3).split('/')[0] != '' &&
    $('#workers_row_gatherer > .row_val').text() != ''
  ) {
    if ($('#workers_row_gatherer > .row_val').text() < 8) {
      // 优先保证木头
      // 木头不足时清空其他所有工作
      while (
        $('.workerRow > .row_val')
          .text()
          .replace($('#workers_row_gatherer > .row_val').text(), '') !=
          '0000' &&
        $('#workers_row_gatherer > .row_val').text() !=
          $('#population').text().substring(3).split('/')[0]
      ) {
        $('.workerRow .dnManyBtn').trigger('click');
      }
    } else {
      // 木头充足时优先保证猎人
      if (
        $('#workers_row_hunter > .row_val').text() != '' &&
        $('#workers_row_hunter > .row_val').text() < 12
      ) {
        while (
          $('#workers_row_gatherer > .row_val').text() > 5 &&
          $('#workers_row_hunter > .row_val').text() < 12
        ) {
          $('#workers_row_hunter .upBtn').trigger('click');
        }
      } else {
        if ($('#workers_row_charcutier > .row_val').text() == '0') {
          $('#workers_row_charcutier .upBtn').trigger('click');
        } else if ($('#workers_row_charcutier > .row_val').text() > 1) {
          $('#workers_row_charcutier .dnBtn').trigger('click');
        }
        if ($('#workers_row_tanner > .row_val').text() == '0') {
          $('#workers_row_tanner .upBtn').trigger('click');
        } else if ($('#workers_row_tanner > .row_val').text() > 1) {
          $('#workers_row_tanner .dnBtn').trigger('click');
        }
        if ($('#workers_row_trapper > .row_val').text() == '0') {
          $('#workers_row_trapper .upBtn').trigger('click');
        } else if ($('#workers_row_trapper > .row_val').text() > 1) {
          $('#workers_row_trapper .dnBtn').trigger('click');
        }

        while (
          $('#workers_row_gatherer > .row_val').text() / 2 >
          $('#workers_row_hunter > .row_val').text()
        ) {
          $('#workers_row_hunter .upBtn').trigger('click');
        }
      }
    }
  }

  if (flag) {
    setTimeout(() => {
      auto();
    }, 500);
  }
};
auto();
