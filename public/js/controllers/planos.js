app.controller('planosController', [
    "$http",
    "$scope",
    function(
        $http,
        $scope
    ) {

    $scope.planos = [];
    $scope.n_usuarios = 2;
    $scope.tipo_plano = "semestral";

    var url_string = window.location.href;
    var url = new URL(url_string);
    var ref = url.searchParams.get("r");

    if(ref) {
        window.localStorage.setItem("cod_ref", ref);
    } else {
        if(window.localStorage.getItem("cod_ref")) {
            ref = window.localStorage.getItem("cod_ref");
        }
    }

    var ambiente = "";
    var url_string = window.location.href;

    if(url_string.indexOf("localhost") == -1) {
        ambiente = "prod";
    } else {
        ambiente = "dev";
    }

    if(ambiente == "dev") {
        $http({
            method:"GET",
            url:"http://adm.pisco.localhost/api/planos"
        }).then(function(result) {
            $scope.planos = result.data;
            for (var i = 0; i < $scope.planos.planos.length; i++) {
                $scope.planos.planos[i].tipo_plano = $scope.planos.planos[i].valor_usr_semestre;
                if($scope.planos.planos[i].nome == "Private") {
                    $scope.planos.planos[i].n_usuarios = 1;
                } else {
                    $scope.planos.planos[i].n_usuarios = 2;
                }
            }
        });
    } else {
        $http({
            method:"GET",
            url:"https://adm.pisco.net.br/api/planos"
        }).then(function(result) {
            $scope.planos = result.data;
            for (var i = 0; i < $scope.planos.planos.length; i++) {
                $scope.planos.planos[i].tipo_plano = $scope.planos.planos[i].valor_usr_semestre;
                if($scope.planos.planos[i].nome == "Private") {
                    $scope.planos.planos[i].n_usuarios = 1;
                } else {
                    $scope.planos.planos[i].n_usuarios = 2;
                }
            }
        });
    }

    $scope.testar = function(data) {
        if(isNaN(data.n_usuarios)) {
            return false;
        }


        var url_redirect = "";

        data.codigo = data.codigo.replace("_1", "_0");

        var data_2_send = "?q=" + btoa("1");
        data_2_send += "&p=" + btoa(data.codigo);
        data_2_send += "&v=" + btoa("0.00");

        if(ref) {
            data_2_send += "&r=" + ref;
        }

        if(ambiente == "dev") {
            url_redirect = "https://adm.pisco.localhost/signup";
        } else {
            url_redirect = "https://adm.pisco.net.br/signup";
        }

        window.location.replace(url_redirect + data_2_send);

    };

    $scope.comprar = function(data) {
        if(isNaN(data.n_usuarios)) {
            $.alertable.alert('Número de usuários digitado incorretamente.');
            return false;
        }


        var data_2_send = "?";
        var url_redirect = "";

        if(ambiente == "dev") {
            url_redirect = "https://adm.pisco.localhost/signup";
        } else {
            url_redirect = "https://adm.pisco.net.br/signup";
        }


        if (data.tipo_plano == data.valor_usr_semestre) {
            data.codigo = data.codigo.replace("_1", "_6");
            data.valor_cobrar = parseFloat((data.valor_usr_semestre * 6) * data.n_usuarios).toFixed(2);
        } else {
            data.codigo = data.codigo.replace("_6", "_1");
            data.valor_cobrar = parseFloat(data.valor_usr_mes * data.n_usuarios).toFixed(2);
        }

        if(data.codigo.substring(0,3) != 'pri') {
            if (data.n_usuarios < 2) {
                $.alertable.alert('Mínimo de 2 usuários.');
                return false;
            }
        }

        data_2_send += "q=" + btoa(data.n_usuarios);
        data_2_send += "&v=" + btoa(data.valor_cobrar);
        data_2_send += "&p=" + btoa(data.codigo);
        if(ref) {
            data_2_send += "&r=" + ref;
        }

        window.location.replace(url_redirect + data_2_send);

    };
}]);

function verificaN(event) {
    if(event.target.value < 2) {
        event.target.value = 2;
        $.alertable.alert('Mínimo de 2 usuários.');
    }
};

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

jQuery&&function(e){"use strict";function t(t,u,s){var d=e.Deferred();return i=document.activeElement,i.blur(),e(l).add(r).remove(),s=e.extend({},e.alertable.defaults,s),l=e(s.modal).hide(),r=e(s.overlay).hide(),n=e(s.okButton),o=e(s.cancelButton),s.html?l.find(".alertable-message").html(u):l.find(".alertable-message").text(u),"prompt"===t?l.find(".alertable-prompt").html(s.prompt):l.find(".alertable-prompt").remove(),e(l).find(".alertable-buttons").append("alert"===t?"":o).append(n),e(s.container).append(r).append(l),s.show.call({modal:l,overlay:r}),"prompt"===t?e(l).find(".alertable-prompt :input:first").focus():e(l).find(':input[type="submit"]').focus(),e(l).on("submit.alertable",function(r){var n,o,i=[];if(r.preventDefault(),"prompt"===t)for(o=e(l).serializeArray(),n=0;n<o.length;n++)i[o[n].name]=o[n].value;else i=null;a(s),d.resolve(i)}),o.on("click.alertable",function(){a(s),d.reject()}),e(document).on("keydown.alertable",function(e){27===e.keyCode&&(e.preventDefault(),a(s),d.reject())}),e(document).on("focus.alertable","*",function(t){e(t.target).parents().is(".alertable")||(t.stopPropagation(),t.target.blur(),e(l).find(":input:first").focus())}),d.promise()}function a(t){t.hide.call({modal:l,overlay:r}),e(document).off(".alertable"),l.off(".alertable"),o.off(".alertable"),i.focus()}var l,r,n,o,i;e.alertable={alert:function(e,a){return t("alert",e,a)},confirm:function(e,a){return t("confirm",e,a)},prompt:function(e,a){return t("prompt",e,a)},defaults:{container:"body",html:!1,cancelButton:'<button class="alertable-cancel" type="button">Cancel</button>',okButton:'<button class="alertable-ok" type="submit">OK</button>',overlay:'<div class="alertable-overlay"></div>',prompt:'<input class="alertable-input" type="text" name="value">',modal:'<form class="alertable"><div class="alertable-message"></div><div class="alertable-prompt"></div><div class="alertable-buttons"></div></form>',hide:function(){e(this.modal).add(this.overlay).fadeOut(100)},show:function(){e(this.modal).add(this.overlay).fadeIn(100)}}}}(jQuery);
