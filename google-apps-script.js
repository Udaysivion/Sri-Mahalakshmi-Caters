/**
 * ==============================================================================
 * Sri Mahalakshmi Caters - Google Sheets Orders Webhook (Google Apps Script)
 * Target Spreadsheet: https://docs.google.com/spreadsheets/d/1Ar8nwyit7UG60zVSC5_0QqgKH_l7gnGuM8XHxwjg3iE/edit
 * ==============================================================================
 *
 * HOW TO SETUP IN 2 MINUTES:
 * 1. Open your Google Sheet in your browser:
 *    https://docs.google.com/spreadsheets/d/1Ar8nwyit7UG60zVSC5_0QqgKH_l7gnGuM8XHxwjg3iE/edit
 * 
 * 2. In the top menu, click:
 *    Extensions  ->  Apps Script
 * 
 * 3. Delete any default code inside the editor, and PASTE THIS ENTIRE FILE.
 * 
 * 4. Click the "Save" (Disk) icon in Apps Script.
 * 
 * 5. Click the blue "Deploy" button (top right) -> choose "New deployment".
 * 
 * 6. In the modal:
 *    - Click the gear icon next to "Select type" and choose "Web app".
 *    - Description: Sri Mahalakshmi Orders API
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (VERY IMPORTANT: Allows customer website to send orders)
 * 
 * 7. Click "Deploy", approve Google permissions when prompted.
 * 
 * 8. Copy the generated "Web app URL" (it looks like: https://script.google.com/macros/s/AKfycb.../exec).
 * 
 * 9. Paste that URL into your frontend `.env` file:
 *    VITE_GOOGLE_SHEET_ORDERS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
 * 
 * Done! When any customer confirms an order on the website, a new sheet named "Orders"
 * will automatically be created in this spreadsheet and every order row will be appended!
 * ==============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // Open Sri Mahalakshmi Orders sheet (works both bound to sheet or standalone)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      ss = SpreadsheetApp.openById("1Ar8nwyit7UG60zVSC5_0QqgKH_l7gnGuM8XHxwjg3iE");
    }
    var sheetName = "Orders";
    var sheet = ss.getSheetByName(sheetName);

    // If "Orders" tab doesn't exist, create it!
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      
      var headers = [
        "Timestamp",
        "Order ID",
        "Customer Name",
        "Phone Number",
        "Delivery Address",
        "Items Ordered",
        "Total Amount (INR)",
        "Payment Method",
        "Payment Status",
        "Payment ID",
        "Special Notes"
      ];
      
      sheet.appendRow(headers);

      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#1B4332");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.orderId || "",
      data.customerName || "",
      data.phone || "",
      data.address || "",
      data.items || "",
      data.totalAmount || 0,
      data.paymentMethod || "Online",
      data.paymentStatus || "Completed",
      data.paymentId || "N/A",
      data.notes || ""
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", orderId: data.orderId })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Function to test directly inside Apps Script by clicking "Run"
function testAddOrder() {
  var testEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        orderId: "SMK-TEST-001",
        customerName: "Test Customer",
        phone: "9876543210",
        address: "Test Address, Hanamkonda",
        items: "2x Masala Dosa (INR 120), 1x Filter Coffee (INR 40)",
        totalAmount: 160,
        paymentMethod: "Razorpay (Test)",
        paymentStatus: "Paid",
        paymentId: "rzp_test_sample",
        notes: "Crispy dosa please"
      })
    }
  };
  var result = doPost(testEvent);
  Logger.log(result.getContent());
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "online", message: "Sri Mahalakshmi Caters Orders Webhook is active!" })
  ).setMimeType(ContentService.MimeType.JSON);
}
