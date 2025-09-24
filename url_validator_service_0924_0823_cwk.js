// 代码生成时间: 2025-09-24 08:23:23
(function() {"use strict";

    /**
     * URLValidatorService Service
     * @module URLValidatorService
     * @description
     * This service provides a method to check if a given string is a valid URL.
     * @returns {{validateURL: validateURL}}
     */
    angular.module("urlValidatorApp", [])
        .factory("URLValidatorService", URLValidatorService);

    /**
     * @ngInject
     */
    function URLValidatorService() {
        var service = {
            validateURL: validateURL
        };

        // Return the service object
        return service;

        /**
         * Validate the URL format
         * @param {string} url The URL to validate
         * @returns {boolean} Returns true if the URL is valid, otherwise false.
         */
        function validateURL(url) {
            // Regular expression for URL validation
            var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            
            try {
                // Test the URL against the regular expression
                return pattern.test(url);
            } catch (error) {
                // Catch any exceptions and return false for invalid URLs
                console.error("Error validating URL: ", error);
                return false;
            }
        }
    }

})();