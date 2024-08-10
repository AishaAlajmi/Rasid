#include <WiFi.h>
#include <FirebaseESP32.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_MPU6050.h>
#include <DHT.h>
#include <arduinoFFT.h>
#include <MQ135.h>

// WiFi credentials
#define WIFI_SSID "√-1Phone"
#define WIFI_PASSWORD "0987654321"

// Firebase credentials
#define FIREBASE_HOST "your-project-id.firebaseio.com"
#define FIREBASE_AUTH "your-database-secret"

// Sensor pins
#define DHTPIN 15 // GPIO pin connected to the DHT11 data pin
#define DHTTYPE DHT11 // DHT sensor type
#define MIC_PIN 36 // GPIO pin connected to the microphone module output
#define GAS_PIN 34 // GPIO pin connected to the MQ-135 analog output

// Constants
#define SAMPLES 128  // Must be a power of 2
#define SAMPLING_FREQUENCY 1000 // Hz, adjust as necessary

// Create sensor objects
DHT dht(DHTPIN, DHTTYPE);
Adafruit_MPU6050 mpu;
ArduinoFFT FFT = arduinoFFT();

// Firebase data object
FirebaseData firebaseData;

// Task handles
TaskHandle_t Task1, Task2, Task3, Task4;

// Function prototypes
void TaskReadDHT11(void *pvParameters);
void TaskReadMPU6050(void *pvParameters);
void TaskReadMicrophone(void *pvParameters);
void TaskReadGasSensor(void *pvParameters);
void initWiFi();
double calculateRMS(int* data, int size);
double calculateDb(double rms);
double calculateFrequency(double* vReal, double* vImag);
double readMQ2PPM(int rawValue);

void setup() {
  // Initialize Serial Communication
  Serial.begin(115200);

  // Initialize WiFi
  initWiFi();

  // Initialize Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  // Initialize sensors
  dht.begin();
  if (!mpu.begin()) {
    Serial.println("Failed to initialize MPU6050!");
    while (1);
  }

  // Create tasks
  xTaskCreate(TaskReadDHT11, "TaskReadDHT11", 2048, NULL, 1, &Task1);
  xTaskCreate(TaskReadMPU6050, "TaskReadMPU6050", 4096, NULL, 1, &Task2);
  xTaskCreate(TaskReadMicrophone, "TaskReadMicrophone", 2048, NULL, 1, &Task3);
  xTaskCreate(TaskReadGasSensor, "TaskReadGasSensor", 2048, NULL, 1, &Task4);
}

void loop() {
  // Do nothing here, all work is done in tasks
}

/**
 * Task to read temperature and humidity from DHT11 sensor
 * and send data to Firebase
 */
void TaskReadDHT11(void *pvParameters) {
  while (1) {
    // Read humidity and temperature from DHT11
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();

    // Check if any reads failed and exit early (to try again).
    if (isnan(humidity) || isnan(temperature)) {
      Serial.println("Failed to read from DHT sensor!");
      vTaskDelay(2000 / portTICK_PERIOD_MS);
      continue;
    }

    // Prepare JSON object
    FirebaseJson json;
    json.set("temperature_C", temperature);
    json.set("humidity_%", humidity);

    // Send data to Firebase
    if (Firebase.RTDB.setJSON(&firebaseData, "/sensors/DHT11", &json)) {
      Serial.println("DHT11 data sent to Firebase.");
    } else {
      Serial.print("Failed to send DHT11 data: ");
      Serial.println(firebaseData.errorReason());
    }

    // Debugging: Print stack high water mark
    Serial.print("TaskReadDHT11 Stack High Water Mark: ");
    Serial.println(uxTaskGetStackHighWaterMark(NULL));

    // Delay before next reading
    vTaskDelay(2000 / portTICK_PERIOD_MS);
  }
}

/**
 * Task to read vibration data from MPU6050 sensor
 * and send data to Firebase
 */
void TaskReadMPU6050(void *pvParameters) {
  double vReal[SAMPLES];
  double vImag[SAMPLES];
  sensors_event_t a, g, temp;
  while (1) {
    // Read samples
    for (int i = 0; i < SAMPLES; i++) {
      mpu.getEvent(&a, &g, &temp);
      vReal[i] = a.acceleration.x;  // Use one of the axes, e.g., x-axis
      vImag[i] = 0;
      delay(1000 / SAMPLING_FREQUENCY);
    }

    // Compute FFT
    FFT.Windowing(vReal, SAMPLES, FFT_WIN_TYP_HAMMING, FFT_FORWARD);
    FFT.Compute(vReal, vImag, SAMPLES, FFT_FORWARD);
    FFT.ComplexToMagnitude(vReal, vImag, SAMPLES);

    // Calculate frequency
    double frequency = calculateFrequency(vReal, vImag);

    // Prepare JSON object
    FirebaseJson json;
    json.set("vibration_Hz", frequency);

    // Send data to Firebase
    if (Firebase.RTDB.setJSON(&firebaseData, "/sensors/MPU6050", &json)) {
      Serial.println("MPU6050 data sent to Firebase.");
    } else {
      Serial.print("Failed to send MPU6050 data: ");
      Serial.println(firebaseData.errorReason());
    }

    // Debugging: Print stack high water mark
    Serial.print("TaskReadMPU6050 Stack High Water Mark: ");
    Serial.println(uxTaskGetStackHighWaterMark(NULL));

    // Delay before next reading
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}

/**
 * Task to read sound level from microphone module
 * and send data to Firebase
 */
void TaskReadMicrophone(void *pvParameters) {
  int micData[SAMPLES];
  while (1) {
    // Read samples
    for (int i = 0; i < SAMPLES; i++) {
      micData[i] = analogRead(MIC_PIN);
      delay(1000 / SAMPLING_FREQUENCY);
    }

    // Calculate RMS
    double rms = calculateRMS(micData, SAMPLES);
    double dB = calculateDb(rms);

    // Prepare JSON object
    FirebaseJson json;
    json.set("sound_dB", dB);

    // Send data to Firebase
    if (Firebase.RTDB.setJSON(&firebaseData, "/sensors/microphone", &json)) {
      Serial.println("Microphone data sent to Firebase.");
    } else {
      Serial.print("Failed to send microphone data: ");
      Serial.println(firebaseData.errorReason());
    }

    // Debugging: Print stack high water mark
    Serial.print("TaskReadMicrophone Stack High Water Mark: ");
    Serial.println(uxTaskGetStackHighWaterMark(NULL));

    // Delay before next reading
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}

/**
 * Task to read gas level from MQ-2 sensor
 * and send data to Firebase
 */
void TaskReadGasSensor(void *pvParameters) {
  while (1) {
    // Read analog value from MQ-135 gas sensor
    MQ135 gasValue = MQ135(GAS_PIN);

    // Convert analog value to ppm
    double airQuality = gasValue.getPPM(gasValue);

    // Prepare JSON object
    FirebaseJson json;
    json.set("gas_ppm", airQuality);

    // Send data to Firebase
    if (Firebase.RTDB.setJSON(&firebaseData, "/sensors/gas", &json)) {
      Serial.println("Gas sensor data sent to Firebase.");
    } else {
      Serial.print("Failed to send gas sensor data: ");
      Serial.println(firebaseData.errorReason());
    }

    // Debugging: Print stack high water mark
    Serial.print("TaskReadGasSensor Stack High Water Mark: ");
    Serial.println(uxTaskGetStackHighWaterMark(NULL));

    // Delay before next reading
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}

/**
 * Initialize WiFi connection
 */
void initWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }
  Serial.println("Connected to WiFi.");
}

/**
 * Calculate RMS value from data
 */
double calculateRMS(int* data, int size) {
  double sum = 0;
  for (int i = 0; i < size; i++) {
    sum += data[i] * data[i];
  }
  return sqrt(sum / size);
}

/**
 * Convert RMS value to decibels
 */
double calculateDb(double rms) {
  return 20 * log10(rms);
}

/**
 * Calculate dominant frequency from FFT results
 */
double calculateFrequency(double* vReal, double* vImag) {
  double peakValue = 0;
  int peakIndex = 0;
  for (int i = 1; i < (SAMPLES / 2); i++) {
    if (vReal[i] > peakValue
