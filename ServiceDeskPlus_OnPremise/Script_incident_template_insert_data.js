var userField = "udf_pick_306";
var employeeIdField = "udf_sline_305";
var departmentField = "udf_sline_302";
var emailField = "udf_sline_303";
var mobileField = "udf_sline_307";

function clearUserFields() {
    $CS.setValue(employeeIdField, "");
    $CS.setValue(departmentField, "");
    $CS.setValue(emailField, "");
    $CS.setValue(mobileField, "");
}

var userId = $CS.getValue(userField);

if (!userId) {
    clearUserFields();
} else {

    jQuery.ajax({
        url: "/api/v3/users/" + encodeURIComponent(userId),
        type: "GET",
        headers: {
            "Accept": "application/vnd.manageengine.sdp.v3+json",
            "Content-Type": "application/x-www-form-urlencoded"
        },

        success: function (response) {
            var employeeId = "";
            var departmentName = "";
            var email = "";
            var mobile = "";
            var user = response && response.user ? response.user : null;

            if (!user) {
                clearUserFields();
                return;
            }
            if (user.employee_id) {
                employeeId = user.employee_id;
            }
            if (user.department && user.department.name) {
                departmentName = user.department.name;
            }
            if (user.email_id) {
                email = user.email_id;
            }
            if (user.mobile) {
                mobile = user.mobile;
            }

            $CS.setValue(employeeIdField, employeeId);
            $CS.setValue(departmentField, departmentName);
            $CS.setValue(emailField, email);
            $CS.setValue(mobileField, mobile);
        },

        error: function () {
            clearUserFields();
        }
    });
}