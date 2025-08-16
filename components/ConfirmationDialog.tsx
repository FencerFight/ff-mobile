import { FG, SURFACE } from '@/constants';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Button from './Button';

interface ConfirmationDialogProps {
  visible: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  setVisible: (value: React.SetStateAction<boolean>) => void
}

export default function ConfirmationDialog({
  visible,
  title = 'Подтвердите действие',
  message,
  onConfirm,
  setVisible,
  confirmText = 'Да',
  cancelText = 'Нет',
}: ConfirmationDialogProps) {
    const onCancel = ()=>setVisible(false)
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dialogContainer}>
              <View style={styles.dialogContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>

                <View style={styles.buttonsContainer}>
                  <Button
                    title={cancelText}
                    onPress={onCancel}
                    style={styles.cancelButton}
                    stroke
                  />
                  <Button
                    title={confirmText}
                    onPress={()=>{onConfirm(); onCancel()}}
                    style={styles.confirmButton}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialogContainer: {
    width: '100%',
    maxWidth: 400,
  },
  dialogContent: {
    backgroundColor: SURFACE,
    borderRadius: 12,
    padding: 24,
    width: '100%',
  },
  title: {
    color: FG,
    fontSize: 20,
    fontFamily: 'IBMPlexSansBold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    color: FG + 'CC', // 80% opacity
    fontSize: 16,
    fontFamily: 'IBMPlexSansRegular',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  cancelButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 1,
  },
});